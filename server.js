import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

import express from 'express'
import compression from 'compression'

const root = path.dirname(fileURLToPath(import.meta.url))

const { values } = parseArgs({
    options: {
        production: { type: 'boolean', default: false },
        port: { type: 'string' },
        host: { type: 'string' },
    },
})

const production = values.production || process.env.NODE_ENV === 'production'
const port = Number(values.port || process.env.PORT || 5173)
const host = values.host || process.env.HOST || (production ? '0.0.0.0' : '127.0.0.1')

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Invalid PORT')
}

const app = express()
app.disable('x-powered-by')

let vite
let template
let renderProduction
let manifest

if (production) {
    template = fs.readFileSync(path.join(root, 'dist/client/index.html'), 'utf8')
    manifest = JSON.parse(
        fs.readFileSync(path.join(root, 'dist/client/.vite/ssr-manifest.json'), 'utf8'),
    )
    renderProduction = (await import('./dist/server/entry-server.js')).render

    app.use(compression())
    app.use(express.static(path.join(root, 'dist/client'), { index: false }))
} else {
    const { createServer } = await import('vite')

    vite = await createServer({ root, server: { middlewareMode: true }, appType: 'custom' })
    app.use(vite.middlewares)
}

async function getDevelopmentStyleLinks(modules) {
    const styles = new Set()

    // Use Vite's compiled style URLs so scoped component CSS is ready before hydration.
    for (const id of modules) {
        const url = `/${id}`
        await vite.transformRequest(url)
        const module = await vite.moduleGraph.getModuleByUrl(url)

        for (const dependency of module?.importedModules ?? []) {
            if (dependency.url.includes('?vue&type=style')) {
                styles.add(dependency.url.replace('?', '?direct&'))
            }
        }
    }

    return [...styles]
        .map((url) => `<link rel="stylesheet" href="${url.replace(/&/g, '&amp;')}">`)
        .join('')
}

app.use(async (req, res) => {
    try {
        const url = req.originalUrl
        const htmlTemplate = production
            ? template
            : await vite.transformIndexHtml(
                  url,
                  fs.readFileSync(path.join(root, 'index.html'), 'utf8'),
              )

        const render = production
            ? renderProduction
            : (await vite.ssrLoadModule('/src/entry-server.ts')).render

        const [appHtml, preloadLinks, headTags, status, modules] = await render(url, manifest)
        const styleLinks = production ? '' : await getDevelopmentStyleLinks(modules)
        const html = htmlTemplate
            .replace('<!--head-tags-->', headTags)
            .replace('<!--preload-links-->', preloadLinks + styleLinks)
            .replace('<!--ssr-outlet-->', appHtml)

        res.status(status).type('html').send(html)
    } catch (error) {
        vite?.ssrFixStacktrace(error)
        console.error(error)
        res.status(500).type('text').send('Unable to load the page.')
    }
})

const server = app.listen(port, host, () => console.log(`Server started on http://${host}:${port}`))

server.on('error', (error) => {
    console.error(error)
    process.exitCode = 1
    vite?.close()
})

for (const signal of ['SIGINT', 'SIGTERM']) {
    process.once(signal, async () => {
        await vite?.close()
        server.close(() => process.exit(0))
        server.closeAllConnections()
    })
}
