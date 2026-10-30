<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'
    import AppIcon from './AppIcon.vue'
    import { hasReachedFooter } from '../footerVisibility'

    const menuOpen = ref(false)
    const scrolled = ref(false)
    const footerReached = ref(false)

    let frame = 0
    let resizeObserver: ResizeObserver | undefined

    function scrollToTop() {
        menuOpen.value = false
        window.scrollTo({ top: 0 })
    }

    function updateScroll() {
        frame = 0
        scrolled.value = window.scrollY > 32
        footerReached.value = hasReachedFooter()

        if (footerReached.value) menuOpen.value = false
    }

    function queueUpdate() {
        if (!frame) frame = requestAnimationFrame(updateScroll)
    }

    const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') menuOpen.value = false
    }

    onMounted(() => {
        updateScroll()
        window.addEventListener('scroll', queueUpdate, { passive: true })
        window.addEventListener('resize', queueUpdate)
        window.addEventListener('keydown', closeOnEscape)

        resizeObserver = new ResizeObserver(queueUpdate)
        resizeObserver.observe(document.body)

        const main = document.getElementById('main')
        if (main) resizeObserver.observe(main)
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', queueUpdate)
        window.removeEventListener('resize', queueUpdate)
        window.removeEventListener('keydown', closeOnEscape)
        resizeObserver?.disconnect()
        cancelAnimationFrame(frame)
    })
</script>

<template>
    <header
        class="site-header"
        :class="{ scrolled, 'menu-open': menuOpen, 'is-hidden': footerReached }"
        :inert="footerReached"
    >
        <button
            class="brand"
            type="button"
            aria-label="YAMP — scroll to top"
            @click="scrollToTop"
        >
            <img
                class="brand-logo"
                src="/yamp.svg"
                alt="YAMP"
                width="320"
                height="274"
            />
            <span class="brand-project">YAMP</span>
        </button>
        <nav
            id="main-navigation"
            class="main-navigation"
            :class="{ open: menuOpen }"
            aria-label="Main navigation"
        >
            <button
                class="nav-project"
                type="button"
                disabled
            >
                Modus <span class="nav-soon">Soon</span>
            </button>
        </nav>
        <a
            class="header-discord icon-button"
            href="https://discord.gg/yamp"
            target="_blank"
            rel="noopener"
            aria-label="Join our Discord"
            title="Join our Discord"
            @click="menuOpen = false"
        >
            <AppIcon
                name="discord"
                :size="22"
            />
        </a>
        <button
            class="menu-toggle icon-button"
            :aria-expanded="menuOpen"
            aria-controls="main-navigation"
            :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'"
            @click="menuOpen = !menuOpen"
        >
            <AppIcon :name="menuOpen ? 'close' : 'menu'" />
        </button>
    </header>
</template>

<style scoped>
    .icon-button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        transition:
            background 0.2s,
            color 0.2s;
    }

    .icon-button:hover {
        color: var(--accent);
        background: var(--hover-strong);
    }

    .site-header {
        position: fixed;
        z-index: 30;
        top: 0;
        left: 0;
        width: 100%;
        height: 64px;
        padding: 0 var(--gutter);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 28px;
        color: var(--text);
        background: color-mix(in srgb, var(--bg) 98%, transparent);
        -webkit-backdrop-filter: blur(0);
        backdrop-filter: blur(0);
        border-bottom: 1px solid var(--line);
        transition:
            background 0.25s,
            border-color 0.25s,
            backdrop-filter 0.25s,
            opacity 0.4s,
            transform 0.5s var(--ease);
        --text: #ededea;
        --text-strong: #fff;
        --text-soft: #bdbdb7;
        --hover-strong: #ffffff14;
        --line-strong: #ffffff2b;
    }

    .site-header.scrolled {
        background: color-mix(in srgb, var(--bg) 64%, transparent);
        -webkit-backdrop-filter: blur(20px) saturate(140%);
        backdrop-filter: blur(20px) saturate(140%);
        border-bottom-color: var(--line-strong);
    }

    .site-header.is-hidden {
        transform: translateY(-14px);
        opacity: 0;
        pointer-events: none;
    }

    .site-header.menu-open {
        background: color-mix(in srgb, var(--bg) 97%, transparent);
    }

    .brand {
        padding: 0;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
    }

    .brand-project {
        display: inline-flex;
        align-items: center;
        gap: 14px;
        color: var(--text-strong);
        font-size: 16px;
        font-weight: 750;
        line-height: 1;
        letter-spacing: 0.14em;
        transition: color 0.2s;
    }

    .brand-project::before {
        content: '';
        width: 3px;
        height: 20px;
        border-radius: 1.5px;
        background: var(--accent);
        opacity: 0.7;
        transform: rotate(20deg);
    }

    .brand:hover .brand-project {
        color: var(--accent);
    }

    .brand-logo {
        width: 30px;
        height: auto;
    }

    .main-navigation {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-left: auto;
    }

    .nav-project {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 44px;
        padding: 0 12px;
        font-size: 13px;
        line-height: 1;
        color: var(--muted);
    }

    .nav-project:disabled {
        cursor: default;
        color: var(--muted);
    }

    .nav-soon {
        padding: 3px 6px;
        border: 1px solid #a9734c40;
        border-radius: 4px;
        color: #c09370;
        font-size: 10px;
        line-height: 1.2;
    }

    .header-discord {
        flex-shrink: 0;
        color: var(--text-soft);
    }

    .menu-toggle {
        display: none;
    }

    @media (max-width: 1000px) {
        .site-header {
            gap: 14px;
        }

        .header-discord {
            margin-left: auto;
        }

        .menu-toggle {
            display: flex;
            width: 40px;
            height: 40px;
        }

        .main-navigation {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            padding: 8px var(--gutter) 20px;
            background: var(--bg);
            border-bottom: 1px solid var(--line);
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            visibility: hidden;
            opacity: 0;
            clip-path: inset(0 0 100% 0);
            transition:
                clip-path 0.35s var(--ease),
                opacity 0.25s,
                visibility 0s 0.35s;
        }

        .main-navigation.open {
            visibility: visible;
            opacity: 1;
            clip-path: inset(0 0 -1px 0);
            transition:
                clip-path 0.35s var(--ease),
                opacity 0.25s;
        }

        .nav-project {
            transform: translateY(-6px);
            transition: transform 0.35s var(--ease);
        }

        .main-navigation.open .nav-project {
            transform: none;
        }

        .nav-project {
            font-size: 15px;
            padding: 14px 0;
        }
    }

    @media (max-width: 760px) {
        .site-header {
            height: 60px;
            gap: 6px;
        }

        .brand {
            gap: 10px;
        }

        .brand-project {
            gap: 10px;
            font-size: 14px;
        }
    }
</style>
