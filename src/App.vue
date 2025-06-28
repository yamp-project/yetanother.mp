<script setup lang="ts">
import { onMounted } from "vue";
import NavigationBar from "./components/NavigationBar.vue";
import BackgroundGrid from "./components/BackgroundGrid.vue";
import HeroBottomBlur from "./components/HeroBottomBlur.vue";
import Footer from "./components/Footer.vue";
import { useGsap } from "./plugins/gsap";

const { ScrollSmoother } = useGsap();

onMounted(() => {
  // disable smooth scrolling on mobile
  const isMobile =
    window.matchMedia("(pointer: coarse)").matches ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  if (isMobile) return;

  // Respect users that prefer reduced motion
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return;

  // Initialise once (HMR-safe)
  if (!ScrollSmoother.get()) {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });
  }
});
</script>

<template>
  <div id="smooth-wrapper" class="relative overflow-x-hidden">
    <div id="smooth-content" class="text-white bg-zinc-950 relative">
      <BackgroundGrid class="pointer-events-none" />
      <NavigationBar class="z-50" />

      <main class="relative z-10">
        <router-view />
      </main>
      <HeroBottomBlur class="absolute bottom-0" />

      <Footer />
    </div>
  </div>
</template>
