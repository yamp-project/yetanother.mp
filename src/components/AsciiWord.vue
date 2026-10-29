<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue'

    const props = defineProps<{ text: string }>()
    const canvas = ref<HTMLCanvasElement>()
    const characters = ' .:-=+*#%@'
    const rows = 18
    const cellAspect = 0.62

    let resizeObserver: ResizeObserver | undefined
    let frame = 0

    const queueDraw = () => {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(draw)
    }

    function draw() {
        const element = canvas.value

        if (!element) return

        const styles = getComputedStyle(element)

        // Footer reveal transforms must not change the glyph grid or canvas resolution.
        const height = Number.parseFloat(styles.height)

        if (!height) return

        const font = `${styles.fontWeight} 200px ${styles.fontFamily}`
        const sample = document
            .createElement('canvas')
            .getContext('2d', { willReadFrequently: true })!
        sample.font = font

        const metrics = sample.measureText(props.text)
        const glyphHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        const glyphWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight

        const cellHeight = height / rows
        const cellWidth = cellHeight * cellAspect
        const columns = Math.ceil(((glyphWidth / glyphHeight) * height) / cellWidth)
        const width = columns * cellWidth

        sample.canvas.width = columns
        sample.canvas.height = rows
        sample.font = `${styles.fontWeight} ${(rows / glyphHeight) * 200}px ${styles.fontFamily}`
        sample.textBaseline = 'alphabetic'
        sample.fillStyle = '#fff'

        const scale = rows / glyphHeight
        sample.setTransform(1 / cellAspect, 0, 0, 1, 0, 0)
        sample.fillText(
            props.text,
            metrics.actualBoundingBoxLeft * scale,
            metrics.actualBoundingBoxAscent * scale,
        )

        const pixels = sample.getImageData(0, 0, columns, rows).data

        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
        element.style.width = `${width}px`
        element.width = Math.round(width * pixelRatio)
        element.height = Math.round(height * pixelRatio)

        const context = element.getContext('2d')!
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        context.font = `600 ${cellHeight * 1.05}px ui-monospace, "Cascadia Code", Consolas, monospace`
        context.textBaseline = 'top'
        context.fillStyle = styles.color

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {
                const coverage = pixels[(y * columns + x) * 4 + 3]! / 255
                const character =
                    characters[
                        Math.min(characters.length - 1, Math.floor(coverage * characters.length))
                    ]!

                if (character !== ' ') {
                    context.fillText(character, x * cellWidth, y * cellHeight)
                }
            }
        }
    }

    onMounted(async () => {
        await document.fonts.ready

        if (!canvas.value) return

        resizeObserver = new ResizeObserver(queueDraw)
        resizeObserver.observe(canvas.value.closest('p') ?? document.body)
        draw()
    })

    onUnmounted(() => {
        resizeObserver?.disconnect()
        cancelAnimationFrame(frame)
    })
</script>

<template>
    <span class="ascii-word">
        <canvas
            ref="canvas"
            aria-hidden="true"
        ></canvas>
        <span class="visually-hidden">{{ text }}</span>
    </span>
</template>

<style scoped>
    .ascii-word {
        display: inline-block;
        vertical-align: baseline;
    }

    canvas {
        display: block;
        height: 0.72em;
        margin-bottom: -0.02em;
    }

    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
    }
</style>
