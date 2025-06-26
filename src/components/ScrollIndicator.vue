<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
import { ref, onMounted, onUnmounted, computed } from "vue";

// Opacity starts at 1 and decreases linearly until the scroll position reaches 200 px.
const opacity = ref(1);

const updateOpacity = () => {
  const y = window.scrollY || 0;
  // Clamp between 0 and 1
  opacity.value = y >= 200 ? 0 : 1 - y / 200;
};

onMounted(() => {
  updateOpacity();
  window.addEventListener("scroll", updateOpacity, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateOpacity);
});

const indicatorStyle = computed(() => ({
  opacity: opacity.value,
}));
</script>

<template>
  <div
    class="absolute bottom-8 flex flex-col items-center animate-bounce"
    :style="indicatorStyle"
  >
    <span class="text-sm text-white/60 mb-2">Scroll Down</span>
    <div
      class="w-8 h-8 border-2 border-white/60 rounded-full flex items-center justify-center"
    >
      <ChevronDown :size="16" class="text-white/60" />
    </div>
  </div>
</template>
