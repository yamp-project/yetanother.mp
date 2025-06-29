<script setup lang="ts">
import NavigationBar from "./components/NavigationBar.vue";
import BackgroundGrid from "./components/BackgroundGrid.vue";
import HeroBottomBlur from "./components/HeroBottomBlur.vue";
import Footer from "./components/Footer.vue";
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
