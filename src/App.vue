<script setup lang="ts">
import NavigationBar from "./components/NavigationBar.vue";
import BackgroundGrid from "./components/BackgroundGrid.vue";
import HeroBottomBlur from "./components/HeroBottomBlur.vue";
import Footer from "./components/Footer.vue";
import Snowfall from "./components/christmas/Snowfall.vue";

import { onMounted, ref } from "vue";
import { useAuth } from "./composables/useAuth";

// Kick off auth state initialisation in the browser.
const { refresh } = useAuth();
onMounted(() => {
  refresh();
});

const showSnow = ref(true);
</script>

<template>
  <div class="relative overflow-x-hidden">
    <!-- Christmas Snowfall -->
    <Transition name="fade">
      <Snowfall v-if="showSnow" />
    </Transition>

    <!-- Snow Toggle Button -->
    <button
      @click="showSnow = !showSnow"
      class="snow-toggle"
      :class="{ active: showSnow }"
      :title="showSnow ? 'Disable snowfall' : 'Enable snowfall'"
    >
      ❅
    </button>

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

<style>
.snow-toggle {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 200;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.snow-toggle:hover {
  background: rgba(0, 0, 0, 0.7);
  border-color: rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.8);
  transform: scale(1.05);
}

.snow-toggle.active {
  color: #a5d8ff;
  border-color: rgba(165, 216, 255, 0.4);
  text-shadow: 0 0 8px rgba(165, 216, 255, 0.6);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
