export function getPageMetadata(notFound: boolean) {
    return {
        title: notFound ? 'Page not found — YAMP' : 'YAMP — Yet Another M* Project is back',
        description: notFound
            ? 'This page does not exist or has been removed. Return to YAMP.'
            : 'Yet Another M* Project is back. Starting with MODUS — FiveM on steroids. Coming soon.',
        robots: notFound ? 'noindex, follow' : 'index, follow',
    }
}

export function updatePageMetadata(notFound: boolean) {
    const metadata = getPageMetadata(notFound)

    document.title = metadata.title

    const metaTags: [string, string][] = [
        ['meta[name="description"]', metadata.description],
        ['meta[name="robots"]', metadata.robots],
        ['meta[property="og:title"]', metadata.title],
        ['meta[property="og:description"]', metadata.description],
    ]

    for (const [selector, value] of metaTags) {
        document.querySelector(selector)?.setAttribute('content', value)
    }

    const canonical = document.querySelector('link[rel="canonical"]')

    if (notFound) {
        canonical?.remove()
    } else if (!canonical) {
        const link = document.createElement('link')
        link.rel = 'canonical'
        link.href = 'https://yetanother.mp/'

        document.head.append(link)
    }
}
