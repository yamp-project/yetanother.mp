<script setup lang="ts">
    import { onMounted, onUnmounted, ref, watch } from 'vue'

    const interactive = 'a, button, summary, label, select, input[type="range"], [role="button"]'
    const restSize = 30
    const lockPadding = 3
    const maxLockWidth = 520
    const maxLockHeight = 180

    const frame = ref<HTMLElement>()
    const point = ref<HTMLElement>()
    const enabled = ref(false)
    const visible = ref(false)
    const pressed = ref(false)
    const sliderHeld = ref(false)
    const locked = ref(false)
    const pointing = ref(false)

    watch(
        [enabled, visible, pointing],
        () => {
            document.documentElement.classList.toggle(
                'cursor-dot-active',
                enabled.value && visible.value && !pointing.value,
            )
        },
        { flush: 'sync' },
    )

    let pointerX = -100
    let pointerY = -100
    let x = -100
    let y = -100
    let width = restSize
    let height = restSize
    let target: Element | null = null
    let animation = 0
    let last = 0
    let media: MediaQueryList | undefined
    let motion: MediaQueryList | undefined

    function follow(now: number) {
        if (!visible.value || document.querySelector('dialog[open]')) {
            visible.value = false
            animation = 0
            last = 0
            return
        }
        // Recheck the element under the pointer as scrolling or layout changes move it.
        target = document.elementFromPoint(pointerX, pointerY)?.closest(interactive) ?? null
        pointing.value = sliderHeld.value || !!target
        const delta = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60
        last = now

        let goalX = pointerX
        let goalY = pointerY
        let goalWidth = restSize
        let goalHeight = restSize

        const bounds = target?.getBoundingClientRect()
        const canLock = !!(
            target &&
            bounds &&
            !target.matches(':disabled, [aria-disabled="true"]') &&
            target.getClientRects().length === 1 &&
            bounds.width > 0 &&
            bounds.width <= maxLockWidth &&
            bounds.height > 0 &&
            bounds.height <= maxLockHeight &&
            bounds.left >= 0 &&
            bounds.top >= 0 &&
            bounds.right <= innerWidth &&
            bounds.bottom <= innerHeight
        )
        if (canLock && bounds) {
            goalX = bounds.left + bounds.width / 2
            goalY = bounds.top + bounds.height / 2
            goalWidth = bounds.width + lockPadding * 2
            goalHeight = bounds.height + lockPadding * 2
        }

        locked.value = canLock
        if (pressed.value) {
            goalWidth *= 0.86
            goalHeight *= 0.86
        }

        const ease = 1 - Math.pow(1 - 0.22, delta * 60)
        x += (goalX - x) * ease
        y += (goalY - y) * ease
        width += (goalWidth - width) * ease
        height += (goalHeight - height) * ease

        if (point.value) point.value.style.translate = `${pointerX}px ${pointerY}px`
        if (frame.value) {
            frame.value.style.transform = `translate3d(${x - width / 2}px, ${y - height / 2}px, 0)`
            frame.value.style.width = `${width}px`
            frame.value.style.height = `${height}px`
        }

        const settled =
            Math.abs(goalX - x) < 0.1 &&
            Math.abs(goalY - y) < 0.1 &&
            Math.abs(goalWidth - width) < 0.1 &&
            Math.abs(goalHeight - height) < 0.1
        animation = settled && !target ? 0 : requestAnimationFrame(follow)
        if (!animation) last = 0
    }

    function wake() {
        if (!animation) animation = requestAnimationFrame(follow)
    }

    function onMove(event: PointerEvent) {
        if (event.pointerType !== 'mouse') return
        if (event.buttons === 0) {
            pressed.value = false
            sliderHeld.value = false
        }

        pointerX = event.clientX
        pointerY = event.clientY
        if (!visible.value) {
            x = pointerX
            y = pointerY
        }

        visible.value = !document.querySelector('dialog[open]')
        target = (event.target as Element | null)?.closest(interactive) ?? null
        pointing.value = sliderHeld.value || !!target
        wake()
    }

    function onLeave(event: MouseEvent) {
        if (event.relatedTarget) return
        visible.value = false
        target = null
        pointing.value = false
    }

    function onDown(event: PointerEvent) {
        if (event.pointerType !== 'mouse' || event.button !== 0) return
        pressed.value = true
        sliderHeld.value = !!(event.target as Element | null)?.closest(
            'input[type="range"], [role="slider"]',
        )
        wake()
    }

    const onUp = () => {
        pressed.value = false
        sliderHeld.value = false
        wake()
    }

    function sync() {
        const active = !!media?.matches && !motion?.matches
        if (active === enabled.value) return
        enabled.value = active

        const method = active ? 'addEventListener' : 'removeEventListener'
        window[method]('pointermove', onMove as EventListener, { passive: true })
        window[method]('pointerdown', onDown as EventListener)
        window[method]('pointerup', onUp)
        window[method]('pointercancel', onUp)
        window[method]('blur', onUp)
        window[method]('scroll', wake, { passive: true, capture: true })
        window[method]('resize', wake)
        document[method]('mouseout', onLeave as EventListener)

        if (!active) {
            cancelAnimationFrame(animation)
            animation = 0
            visible.value = false
            pressed.value = false
            sliderHeld.value = false
        }
    }

    onMounted(() => {
        media = matchMedia('(hover: hover) and (pointer: fine)')
        motion = matchMedia('(prefers-reduced-motion: reduce)')
        media.addEventListener('change', sync)
        motion.addEventListener('change', sync)
        sync()
    })

    onUnmounted(() => {
        media?.removeEventListener('change', sync)
        motion?.removeEventListener('change', sync)
        media = motion = undefined
        enabled.value = true
        sync()
        document.documentElement.classList.remove('cursor-dot-active')
    })
</script>

<template>
    <div
        v-if="enabled"
        class="cursor"
        :class="{
            visible,
            pressed,
            locked,
            pointing,
            'frame-hidden': sliderHeld || (pointing && !locked),
        }"
        aria-hidden="true"
    >
        <span
            ref="frame"
            class="cursor-frame"
        >
            <i></i>
            <i></i>
            <i></i>
            <i></i>
        </span>
        <span
            ref="point"
            class="cursor-point"
        >
            <span class="cursor-dot"></span>
        </span>
    </div>
</template>

<style scoped>
    .cursor {
        --cursor-dot: #ededea;
        --cursor-outline: #09090ab3;
        --cursor-frame: #ededeab3;

        position: fixed;
        inset: 0;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.25s;
    }

    .cursor.visible {
        opacity: 1;
    }

    @media (hover: hover) and (pointer: fine) {
        :global(html),
        :global(html *) {
            cursor:
                url('/images/cursor.png') 0 0,
                auto !important;
        }

        :global(html.cursor-dot-active),
        :global(html.cursor-dot-active *) {
            cursor: none !important;
        }
    }

    .cursor-point {
        position: fixed;
        top: 0;
        left: 0;
    }

    .cursor-dot {
        position: absolute;
        top: -3.5px;
        left: -3.5px;
        width: 7px;
        height: 7px;
        background: var(--cursor-dot);
        box-shadow: 0 0 0 1px var(--cursor-outline);
        rotate: 45deg;
        transition: scale 0.3s var(--ease);
    }

    .cursor.pressed .cursor-dot {
        scale: 0.5;
    }

    .cursor.pointing .cursor-point {
        visibility: hidden;
    }

    .cursor-frame {
        position: fixed;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        will-change: transform, width, height;
        transition: opacity 0.15s;
    }

    .cursor.frame-hidden .cursor-frame {
        opacity: 0;
    }

    .cursor-frame i {
        position: absolute;
        width: 7px;
        height: 7px;
        border: 0 solid var(--cursor-frame);
        transition:
            border-color 0.25s,
            width 0.25s,
            height 0.25s;
    }

    .cursor-frame i:nth-child(1) {
        top: 0;
        left: 0;
        border-top-width: 1.5px;
        border-left-width: 1.5px;
    }

    .cursor-frame i:nth-child(2) {
        top: 0;
        right: 0;
        border-top-width: 1.5px;
        border-right-width: 1.5px;
    }

    .cursor-frame i:nth-child(3) {
        bottom: 0;
        left: 0;
        border-bottom-width: 1.5px;
        border-left-width: 1.5px;
    }

    .cursor-frame i:nth-child(4) {
        bottom: 0;
        right: 0;
        border-bottom-width: 1.5px;
        border-right-width: 1.5px;
    }

    .cursor.locked .cursor-frame i {
        width: 5px;
        height: 5px;
        border-color: var(--accent);
    }
</style>
