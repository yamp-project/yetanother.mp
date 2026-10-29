<script setup lang="ts">
    import { RouterLink } from 'vue-router'
    import AsciiWord from '../components/AsciiWord.vue'
    import AppIcon from '../components/AppIcon.vue'
</script>

<template>
    <div
        id="home"
        class="landing"
    >
        <main
            id="main"
            class="not-found"
            aria-labelledby="not-found-heading"
        >
            <div class="not-found-copy">
                <p class="not-found-status">Error 404</p>
                <h1 id="not-found-heading">Page not<br /><span>found.</span></h1>
                <p class="not-found-description">This page doesn't exist or has been removed.</p>
                <RouterLink
                    class="home-button"
                    to="/"
                >
                    Back to YAMP
                    <AppIcon
                        name="arrow"
                        :size="17"
                    />
                </RouterLink>
            </div>
            <p
                class="not-found-art"
                aria-hidden="true"
            >
                <AsciiWord text="404" />
            </p>
        </main>
    </div>
</template>

<style scoped>
    .not-found {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        align-items: center;
        gap: 40px;
    }

    .not-found-copy {
        position: relative;
        z-index: 1;
    }

    .not-found-status {
        margin-bottom: 24px;
        font-size: 13px;
        color: var(--muted);
    }

    .not-found h1 > span {
        color: var(--accent);
    }

    .not-found-description {
        margin-top: 24px;
        max-width: 340px;
        font-size: 14px;
        line-height: 1.7;
        color: var(--muted);
    }

    .home-button {
        display: inline-flex;
        align-items: center;
        gap: 24px;
        min-height: 46px;
        padding: 12px 20px;
        margin-top: 30px;
        border: 1px solid #a9734c60;
        border-radius: 8px;
        background: #111112;
        color: #ededea;
        font-size: 13px;
    }

    .home-button:hover {
        background: #18181b;
        color: #d2a17d;
    }

    .not-found-art {
        min-width: 0;
        text-align: center;
        font-size: clamp(100px, 16vw, 260px);
        font-weight: 600;
        line-height: 1;
        color: var(--accent);
        opacity: 0.5;
    }

    @media (max-width: 760px) {
        .not-found {
            grid-template-columns: 1fr;
            gap: 0;
        }

        .not-found-art {
            position: absolute;
            right: 20px;
            bottom: 48px;
            font-size: 100px;
            opacity: 0.15;
        }

        .not-found-description {
            max-width: 260px;
        }
    }

    @media (max-height: 500px) {
        .not-found {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
        }

        .not-found-art {
            position: static;
            font-size: clamp(80px, 15vw, 160px);
            opacity: 0.3;
        }

        .not-found-status {
            margin-bottom: 12px;
        }

        .not-found-description {
            margin-top: 14px;
        }

        .home-button {
            margin-top: 16px;
        }
    }
</style>
