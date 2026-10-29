<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue'
    import AsciiWord from './AsciiWord.vue'

    const discord = 'https://discord.gg/yamp'

    const reveal = ref(0)
    const footer = ref<HTMLElement>()

    let frame = 0

    function scrollToTop() {
        window.scrollTo({ top: 0 })
    }

    function update() {
        frame = 0
        const main = document.getElementById('main')

        if (!main || !footer.value) return

        const uncovered = window.innerHeight - main.getBoundingClientRect().bottom
        reveal.value = Math.max(0, Math.min(1, uncovered / footer.value.offsetHeight))
    }

    function queueUpdate() {
        if (!frame) frame = requestAnimationFrame(update)
    }

    onMounted(() => {
        window.addEventListener('scroll', queueUpdate, { passive: true })
        window.addEventListener('resize', queueUpdate)
        update()
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', queueUpdate)
        window.removeEventListener('resize', queueUpdate)
        cancelAnimationFrame(frame)
    })
</script>

<template>
    <footer
        ref="footer"
        class="site-footer"
        :style="{ '--reveal': reveal }"
    >
        <img
            class="footer-art"
            src="/images/after-hours.webp"
            alt=""
            loading="lazy"
        />
        <div class="footer-inner">
            <div class="footer-top">
                <button
                    class="footer-brand"
                    type="button"
                    aria-label="YAMP — scroll to top"
                    @click="scrollToTop"
                >
                    <img
                        src="/yamp.svg"
                        alt="YAMP"
                        width="320"
                        height="274"
                    />
                </button>
                <div class="footer-links">
                    <div>
                        <p>Community</p>
                        <a
                            :href="discord"
                            target="_blank"
                            rel="noopener"
                        >
                            Discord ↗
                        </a>
                        <a
                            href="/credits.txt"
                            target="_blank"
                            rel="noopener"
                        >
                            Credits
                        </a>
                    </div>
                </div>
            </div>

            <p class="footer-slogan">
                Yet Another<br /><span><AsciiWord text="M*" /></span> Project
            </p>

            <div class="footer-bottom">
                <span>© {{ new Date().getFullYear() }} YAMP</span>
                <span>Independent modding group</span>
                <button
                    class="back-top"
                    type="button"
                    @click="scrollToTop"
                >
                    Back to top ↑
                </button>
            </div>
        </div>
    </footer>
</template>

<style scoped>
    .site-footer {
        position: sticky;
        bottom: 0;
        z-index: 0;
        height: 100vh;
        height: 100svh;
        min-height: 560px;
        overflow: hidden;
        background: var(--surface);
        --surface: #111112;
        --text: #ededea;
    }

    .footer-art {
        position: absolute;
        inset: -6% 0 0;
        width: 100%;
        height: calc(106% + 8vh);
        object-fit: cover;
        object-position: center 60%;
        opacity: 0.14;
        filter: grayscale(1) contrast(1.15);
        pointer-events: none;
        -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 45%, #000 100%);
        mask-image: linear-gradient(to bottom, transparent 0%, #000 45%, #000 100%);
        transform: translateY(calc((1 - var(--reveal, 1)) * -8vh));
        will-change: transform;
    }

    .footer-inner {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 48px;
        padding: 104px var(--gutter) 28px;
        opacity: calc(0.25 + var(--reveal, 1) * 0.75);
        transform: translateY(calc((1 - var(--reveal, 1)) * -22vh))
            scale(calc(0.94 + var(--reveal, 1) * 0.06));
        transform-origin: 50% 100%;
        will-change: transform, opacity;
    }

    .footer-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 40px;
    }

    .footer-brand {
        padding: 0;
        display: inline-flex;
        align-items: center;
        gap: 14px;
        font-size: 13px;
        color: var(--muted);
    }

    .footer-brand img {
        width: 44px;
        height: auto;
        display: block;
    }

    .footer-links {
        display: flex;
        gap: clamp(40px, 8vw, 120px);
    }

    .footer-links > div {
        display: grid;
        gap: 10px;
        align-content: start;
    }

    .footer-links p {
        font-size: 13px;
        color: var(--muted);
        margin-bottom: 4px;
        line-height: 1.7;
    }

    .footer-links a {
        justify-self: start;
        font-size: 15px;
        color: var(--text);
    }

    .footer-links a:hover,
    .footer-links a[aria-current] {
        color: var(--accent);
    }

    .footer-slogan {
        font-size: clamp(44px, 7.5vw, 132px);
        font-weight: 600;
        line-height: 0.92;
        letter-spacing: -0.065em;
        color: var(--text);
    }

    .footer-slogan span {
        color: var(--accent);
    }

    .footer-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
        padding-top: 22px;
        border-top: 1px solid var(--line);
        color: var(--muted);
        font-size: 13px;
        line-height: 1.6;
    }

    .back-top {
        padding: 0;
        flex-shrink: 0;
        color: var(--text);
    }

    @media (max-width: 760px) {
        .footer-inner {
            padding: 88px var(--gutter) 22px;
            gap: 32px;
        }

        .footer-top {
            flex-direction: column;
            gap: 32px;
        }

        .footer-bottom {
            flex-wrap: wrap;
            gap: 8px 16px;
        }

        .footer-bottom > span:nth-child(2) {
            order: 3;
            width: 100%;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .footer-inner,
        .footer-art {
            transform: none;
        }

        .footer-inner {
            opacity: 1;
        }
    }
</style>
