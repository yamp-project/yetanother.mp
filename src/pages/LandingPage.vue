<script setup lang="ts">
    import { ref } from 'vue'
    import ProjectScene from '../components/ProjectScene.vue'

    const sceneReady = ref(false)
</script>

<template>
    <div
        id="home"
        class="landing"
    >
        <main id="main">
            <section
                class="hero"
                aria-labelledby="hero-heading"
            >
                <div class="hero-copy">
                    <h1 id="hero-heading">We are back.</h1>
                </div>
                <div class="hero-art">
                    <div
                        class="art-stage"
                        aria-hidden="true"
                    >
                        <img
                            v-if="!sceneReady"
                            class="art-fallback"
                            src="/yamp.svg"
                            alt=""
                        />
                        <ProjectScene @ready="sceneReady = true" />
                    </div>
                </div>
            </section>

            <section
                class="roadmap"
                aria-labelledby="roadmap-heading"
            >
                <div class="section-heading">
                    <h2 id="roadmap-heading">Projects</h2>
                </div>
                <div class="roadmap-content">
                    <article
                        class="project-card"
                        aria-labelledby="modus-heading"
                    >
                        <div class="project-title">
                            <h3 id="modus-heading">MODUS</h3>
                            <span class="soon">Soon</span>
                        </div>
                        <p>FiveM mod</p>
                    </article>
                    <div class="more-planned">More planned</div>
                </div>
            </section>
        </main>
    </div>
</template>

<style scoped>
    .hero {
        display: grid;
        grid-template-columns: 1.05fr 1fr;
        min-height: 0;
        align-items: center;
        position: relative;
    }

    .hero-copy {
        padding: 24px 0;
        position: relative;
        z-index: 1;
    }

    .hero-copy h1 {
        font-weight: 550;
        letter-spacing: -0.045em;
        line-height: 1;
    }

    .hero-art {
        height: 100%;
        min-height: 0;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .art-stage {
        width: 100%;
        height: calc(100% - 40px);
        max-height: 560px;
        position: relative;
        transform: translateX(-10%);
    }

    .art-fallback {
        position: absolute;
        width: 36%;
        left: 32%;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0.5;
    }

    .roadmap {
        width: 100%;
    }

    .section-heading {
        margin-bottom: 14px;
    }

    .section-heading h2 {
        font-size: 12px;
        font-weight: 400;
        color: var(--muted);
    }

    .roadmap-content {
        display: grid;
        grid-template-columns: minmax(280px, 360px) minmax(180px, 240px);
        gap: 16px;
        grid-template-rows: 128px;
    }

    .project-card {
        min-width: 0;
        min-height: 0;
        padding: 22px 24px;
        border: 1px solid #ffffff14;
        border-radius: 4px;
        background: #ffffff05;
        display: grid;
        align-content: center;
        gap: 10px;
    }

    .project-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
    }

    .project-title h3 {
        color: #eeebe5;
        font-size: 32px;
        font-weight: 600;
        letter-spacing: -0.03em;
        line-height: 1;
    }

    .soon {
        font-size: 12px;
        color: var(--accent);
    }

    .project-card p {
        font-size: 14px;
        line-height: 1.5;
        color: var(--muted);
    }

    .more-planned {
        min-width: 0;
        min-height: 0;
        border: 1px dashed #ffffff14;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        color: #77746e;
    }

    @media (min-width: 761px) and (max-height: 700px) {
        .roadmap-content {
            grid-template-rows: 112px;
        }

        .project-card {
            padding: 18px 20px;
            gap: 10px;
        }
    }

    @media (max-width: 760px) {
        .hero {
            grid-template-columns: 1fr;
        }

        .hero-art {
            position: absolute;
            right: -16px;
            top: 0;
            width: 52%;
            opacity: 0.2;
            pointer-events: none;
        }

        .art-stage {
            transform: none;
        }

        .roadmap-content {
            grid-template-columns: 1fr;
            grid-template-rows: 110px 70px;
            gap: 12px;
        }

        .more-planned {
            height: 70px;
        }

        .project-card {
            padding: 20px 22px;
            gap: 10px;
        }

        .project-title h3 {
            font-size: 28px;
        }

        .project-card p {
            font-size: 13px;
        }
    }

    @media (max-width: 760px) and (max-height: 600px) {
        .hero-copy {
            padding: 16px 0;
        }

        .roadmap-content {
            grid-template-rows: 90px 54px;
        }

        .project-card {
            padding: 14px 16px;
        }

        .more-planned {
            height: 54px;
        }
    }

    @media (max-height: 500px) and (min-width: 560px) {
        .hero {
            display: flex;
        }

        .hero-copy {
            padding: 0;
        }

        .hero-art {
            display: none;
        }

        .roadmap {
            align-self: center;
        }

        .roadmap-content {
            grid-template-columns: 1fr;
            grid-template-rows: 90px 64px;
            gap: 8px;
        }

        .project-card {
            padding: 14px 18px;
            gap: 8px;
        }

        .more-planned {
            height: 64px;
        }

        .project-card p {
            font-size: 11px;
        }

        .section-heading {
            margin-bottom: 10px;
        }
    }
</style>
