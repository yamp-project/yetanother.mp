import { renderToString } from '@vue/server-renderer'
import { createVueApp } from './app'
import { getPageMetadata } from './metadata'

type Manifest = Record<string, string[]>

const escapeHtml = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function renderPreloadLink(file: string) {
    const href = escapeHtml(file)

    if (file.endsWith('.js')) {
        return `<link rel="modulepreload" crossorigin href="${href}">`
    }

    if (file.endsWith('.css')) {
        return `<link rel="stylesheet" href="${href}">`
    }

    return ''
}

export async function render(
    url: string,
    manifest?: Manifest,
): Promise<[string, string, string, number, string[]]> {
    const { app, router } = createVueApp()

    await router.push(url)
    await router.isReady()

    const notFound = router.currentRoute.value.name === 'NotFound'
    const metadata = getPageMetadata(notFound)
    const context: { modules?: Set<string> } = {}
    const html = await renderToString(app, context)

    const files = new Set<string>()

    for (const id of context.modules ?? []) {
        for (const file of manifest?.[id] ?? []) {
            files.add(file)
        }
    }

    const preloadLinks = [...files].map(renderPreloadLink).join('')
    const head = `<title>${escapeHtml(metadata.title)}</title>
    <meta name="description" content="${escapeHtml(metadata.description)}">
    <meta name="robots" content="${metadata.robots}">
    <meta property="og:title" content="${escapeHtml(metadata.title)}">
    <meta property="og:description" content="${escapeHtml(metadata.description)}">
    ${notFound ? '' : '<link rel="canonical" href="https://yetanother.mp/">'}`

    return [html, preloadLinks, head, notFound ? 404 : 200, [...(context.modules ?? [])]]
}
