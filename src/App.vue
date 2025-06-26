<script setup lang="ts">
import NavigationBar from "./components/NavigationBar.vue";
import BackgroundGrid from "./components/BackgroundGrid.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="text-white overflow-x-hidden bg-zinc-950 relative">
    <BackgroundGrid class="pointer-events-none" />
    <NavigationBar class="z-50" />

    <main class="relative z-10">
      <router-view />
    </main>

    <Footer />
  </div>
</template>
