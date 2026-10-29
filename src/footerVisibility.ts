// The footer takes over once the bottom of the page crosses the viewport midpoint.
export function hasReachedFooter() {
    const pageBottom = document.getElementById('main')?.getBoundingClientRect().bottom ?? Infinity
    return pageBottom <= window.innerHeight * 0.5
}
