<script setup lang="ts">
import NavigationBar from "./components/NavigationBar.vue";
import BackgroundGrid from "./components/BackgroundGrid.vue";
import HeroBottomBlur from "./components/HeroBottomBlur.vue";
import Footer from "./components/Footer.vue";
import Snowfall from "./components/christmas/Snowfall.vue";

import { onMounted } from "vue";
import { useAuth } from "./composables/useAuth";

// Kick off auth state initialisation in the browser.
const { refresh } = useAuth();
onMounted(() => {
  refresh();
});
</script>

<template>
  <div class="relative overflow-x-hidden">
    <!-- Christmas Snowfall -->
    <Snowfall />

    <div class="text-white bg-zinc-950 relative">
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
