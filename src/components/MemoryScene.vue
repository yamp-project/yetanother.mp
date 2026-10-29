<script setup lang="ts">
    import { onMounted, onUnmounted, ref, watch } from 'vue'

    // A scrolling hex dump of a module's .text section; a signature scan applies patches as lines cross it.

    const props = withDefaults(defineProps<{ active?: boolean }>(), { active: true })
    const canvas = ref<HTMLCanvasElement>()
    const paused = ref(false)
    const ready = ref(false)
    const frameInterval = 1000 / 20

    let context: CanvasRenderingContext2D | null = null
    let width = 0
    let height = 0
    let cellWidth = 8
    let cellHeight = 12
    let rows = 0
    let columns = 0
    let elapsed = 4
    let frame = 0
    let lastFrame = 0
    let visible = true
    let accent = '#a9734c'
    let resizeObserver: ResizeObserver | undefined
    let intersectionObserver: IntersectionObserver | undefined
    let preference: MediaQueryList | undefined

    const hash = (a: number, b = 0, c = 0) => {
        const value = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453
        return value - Math.floor(value)
    }

    const hex = (value: number, digits: number) =>
        value.toString(16).toUpperCase().padStart(digits, '0')

    // The dump is assembled from real x64 encodings: MSVC-style frames, RIP-relative loads, calls and
    // branches, with int3 padding between functions. Patches sit on instruction boundaries and keep
    // branch targets intact, the way a hand-written byte patch would.

    type Patch = { line: number; note: string }

    const lineCount = 4096
    const lineSpeed = 1.4
    const textBase = 0x7ff6a1c31000
    const original = new Uint8Array(lineCount * 16)
    const patched = new Uint8Array(lineCount * 16)
    const patchOf = new Int32Array(lineCount * 16).fill(-1)
    const patches: Patch[] = []
    const notes = new Map<number, number>()

    const frames = [
        {
            prologue: [
                0x48, 0x89, 0x5c, 0x24, 0x08, 0x48, 0x89, 0x74, 0x24, 0x10, 0x57, 0x48, 0x83, 0xec,
                0x20,
            ],
            epilogue: [
                0x48, 0x8b, 0x5c, 0x24, 0x30, 0x48, 0x8b, 0x74, 0x24, 0x38, 0x48, 0x83, 0xc4, 0x20,
                0x5f, 0xc3,
            ],
        },
        {
            prologue: [0x40, 0x53, 0x48, 0x83, 0xec, 0x20],
            epilogue: [0x48, 0x83, 0xc4, 0x20, 0x5b, 0xc3],
        },
        { prologue: [0x48, 0x83, 0xec, 0x28], epilogue: [0x48, 0x83, 0xc4, 0x28, 0xc3] },
    ]

    function buildMemory() {
        let seed = 0
        let cursor = 0
        const random = () => hash(seed++, 77)
        const pick = <T,>(items: readonly T[]) => items[Math.floor(random() * items.length)]!
        const byte = (limit = 256) => Math.floor(random() * limit)
        const disp = (scale: number) => (1 + byte(15)) * scale
        const rel8 = () => 4 + byte(0x3c)
        const rel32 = () => {
            const value = Math.floor((random() - 0.5) * 0x400000)
            return [value & 255, (value >> 8) & 255, (value >> 16) & 255, (value >> 24) & 255]
        }

        const emit = (code: number[], patch?: number[], note?: string) => {
            if (patch) {
                const line = Math.floor(cursor / 16)
                patches.push({ line, note: note! })
                if (!notes.has(line)) notes.set(line, patches.length - 1)
            }

            code.forEach((value, index) => {
                if (cursor >= original.length) return
                const changed = patch && index < patch.length
                original[cursor] = value
                patched[cursor] = changed ? patch[index]! : value
                patchOf[cursor] = changed ? patches.length - 1 : -1
                cursor++
            })
        }

        const call = () => {
            const target = rel32()
            if (random() < 0.07)
                emit([0xe8, ...target], [0x0f, 0x1f, 0x44, 0x00, 0x00], '; nop call')
            else emit([0xe8, ...target])
        }

        const branch = (opcode: number) => {
            const offset = rel8()
            if (random() > 0.1) emit([opcode, offset])
            else if (opcode === 0x74) emit([opcode, offset], [0xeb, offset], '; jz -> jmp')
            else emit([opcode, offset], [0x90, 0x90], '; nop jnz')
        }

        const nearBranch = () => {
            const target = rel32()
            if (random() < 0.1)
                emit([0x0f, 0x84, ...target], [0x90, 0xe9, ...target], '; jz -> jmp near')
            else emit([0x0f, 0x84, ...target])
        }

        const body = [
            () => emit([0x48, 0x8b, 0xcb]),
            () => emit([0x48, 0x8b, 0xd7]),
            () => emit([0x48, 0x8b, 0x05, ...rel32()]),
            () => emit([0x48, 0x8d, 0x0d, ...rel32()]),
            () => emit([0x48, 0x8d, 0x15, ...rel32()]),
            () => emit([0xff, 0x15, ...rel32()]),
            () => emit([0x48, 0x85, 0xc0]),
            () => emit([0x84, 0xc0]),
            () => emit([0x8b, 0x43, disp(4)]),
            () => emit([0x48, 0x8b, 0x4b, disp(8)]),
            () => emit([0x89, 0x47, disp(4)]),
            () => emit([0x33, 0xd2]),
            () => emit([0x33, 0xc0]),
            () => emit([0x83, 0xf8, byte(0x40)]),
            () => emit([0x41, 0xb8, byte(), byte(4), 0x00, 0x00]),
            () => emit([0xf3, 0x0f, 0x10, 0x43, disp(4)]),
            () => emit([0x48, 0x8b, 0x01, 0xff, 0x50, disp(8)]),
            () => emit([0xb0, 0x01]),
            call,
            call,
            () => branch(0x74),
            () => branch(0x75),
            nearBranch,
        ]

        while (cursor < original.length) {
            const frame = pick(frames)
            const roll = random()
            if (roll < 0.04) emit(frame.prologue, [0xb0, 0x01, 0xc3], '; ret true')
            else if (roll < 0.07) emit(frame.prologue, [0x32, 0xc0, 0xc3], '; ret false')
            else emit(frame.prologue)

            for (let count = 6 + byte(26); count > 0; count--) pick(body)()

            emit(frame.epilogue)
            emit(Array((16 - (cursor % 16)) % 16).fill(0xcc))
        }
    }

    function drawMemory() {
        const layers = new Map<string, [string, number, number][]>()

        const put = (color: string, alpha: number, value: string, column: number, y: number) => {
            const key = `${color}|${Math.round(alpha * 20) / 20}`
            let layer = layers.get(key)
            if (!layer) layers.set(key, (layer = []))
            for (let index = 0; index < value.length; index++) {
                if (value[index] !== ' ')
                    layer.push([value[index]!, (column + index) * cellWidth, y])
            }
        }

        const left = Math.max(2, Math.floor((columns - 98) / 2))
        const scanY = Math.round((height * 0.12) / cellHeight) * cellHeight
        const scroll = elapsed * lineSpeed
        const first = Math.floor(scroll)
        const shift = (scroll - first) * cellHeight
        const sinceScan = (line: number, y: number, start: number) =>
            (y - (line - start) * cellHeight - scanY) / cellHeight / lineSpeed

        for (let row = -1; row <= rows; row++) {
            const line = (((row - first + lineCount - 1000) % lineCount) + lineCount) % lineCount
            const y = row * cellHeight + shift
            const current = Math.abs(y - scanY) < cellHeight / 2
            const base = current ? 0.7 : 0.36

            put('#77746e', current ? 0.7 : 0.4, hex(textBase + line * 16, 12), left, y)

            let ascii = ''
            for (let index = 0; index < 16; index++) {
                const offset = line * 16 + index
                const patch = patchOf[offset]!
                const since = patch < 0 ? -1 : sinceScan(line, y, patches[patch]!.line)
                const value = since > 0 ? patched[offset]! : original[offset]!
                const column = left + 14 + index * 3 + (index > 7 ? 1 : 0)
                if (since > 0 && since < 1) put('#ece9e2', 1, hex(value, 2), column, y)
                else if (since > 0) put(accent, 0.85, hex(value, 2), column, y)
                else
                    put(
                        '#bdb9b0',
                        value === 0x00 || value === 0xcc ? base * 0.5 : base,
                        hex(value, 2),
                        column,
                        y,
                    )
                ascii += value > 0x20 && value < 0x7f ? String.fromCharCode(value) : '.'
            }

            put('#77746e', base * 0.9, ascii, left + 64, y)

            const note = notes.get(line)
            const since = note === undefined ? -1 : sinceScan(line, y, line)
            if (since > 0)
                put(accent, 0.3 + Math.max(0, 1 - since) * 0.6, patches[note!]!.note, left + 82, y)
        }

        put(accent, 0.9, '>', left - 2, scanY)

        context!.clearRect(0, 0, width, height)
        for (const [key, glyphs] of layers) {
            const [color, alpha] = key.split('|')
            context!.fillStyle = color!
            context!.globalAlpha = Number(alpha)
            for (const [character, x, y] of glyphs) context!.fillText(character, x, y)
        }
        context!.globalAlpha = 1
    }

    function render() {
        if (!context || !columns) return
        context.font = `${cellWidth * 1.5}px ui-monospace, "Cascadia Code", Consolas, monospace`
        context.textBaseline = 'top'
        drawMemory()
    }

    function stop() {
        cancelAnimationFrame(frame)
        frame = 0
        lastFrame = 0
    }

    function tick(now: number) {
        frame = requestAnimationFrame(tick)
        if (lastFrame && now - lastFrame < frameInterval) return
        elapsed += lastFrame ? Math.min(0.2, (now - lastFrame) / 1000) : 0
        lastFrame = now
        render()
    }

    function syncAnimation() {
        stop()
        if (props.active && !paused.value && visible && !document.hidden)
            frame = requestAnimationFrame(tick)
    }

    function resize() {
        const element = canvas.value
        if (!element) return
        const bounds = element.getBoundingClientRect()
        width = bounds.width
        height = bounds.height
        if (!width || !height) return

        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
        element.width = Math.round(width * pixelRatio)
        element.height = Math.round(height * pixelRatio)
        context = element.getContext('2d')
        context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

        cellWidth = Math.max(6.5, width / 110)
        cellHeight = cellWidth * 1.55
        columns = Math.ceil(width / cellWidth)
        rows = Math.ceil(height / cellHeight)
        render()
        ready.value = true
    }

    function syncPreference() {
        paused.value = preference?.matches ?? false
        syncAnimation()
    }

    watch(paused, syncAnimation)
    watch(() => props.active, syncAnimation)

    onMounted(() => {
        accent =
            getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || accent
        buildMemory()
        preference = matchMedia('(prefers-reduced-motion: reduce)')
        preference.addEventListener('change', syncPreference)
        document.addEventListener('visibilitychange', syncAnimation)
        resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(canvas.value!)
        intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry?.isIntersecting ?? false
            syncAnimation()
        })
        intersectionObserver.observe(canvas.value!)
        resize()
        syncPreference()
    })

    onUnmounted(() => {
        stop()
        resizeObserver?.disconnect()
        intersectionObserver?.disconnect()
        preference?.removeEventListener('change', syncPreference)
        document.removeEventListener('visibilitychange', syncAnimation)
    })
</script>

<template>
    <div
        class="ascii-art"
        :class="{ ready }"
        aria-hidden="true"
    >
        <canvas
            ref="canvas"
            class="ascii-canvas"
            :data-paused="paused"
        ></canvas>
    </div>
</template>

<style scoped>
    .ascii-art {
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0;
        mask-image: linear-gradient(transparent, #000 18%, #000 82%, transparent);
    }

    .ascii-art.ready {
        opacity: 0.8;
    }

    .ascii-canvas {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
