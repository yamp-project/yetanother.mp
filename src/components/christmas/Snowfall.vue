<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Snowflake {
  id: number;
  x: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  blur: number;
}

const snowflakes = ref<Snowflake[]>([]);

onMounted(() => {
  const count = 60;
  snowflakes.value = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 12 + 8,
    opacity: Math.random() * 0.6 + 0.2,
    duration: Math.random() * 8 + 8,
    delay: Math.random() * -15,
    drift: (Math.random() - 0.5) * 100,
    blur: Math.random() > 0.7 ? Math.random() * 2 : 0,
  }));
});
</script>

<template>
  <div class="snowfall" aria-hidden="true">
    <div
      v-for="flake in snowflakes"
      :key="flake.id"
      class="snowflake"
      :style="{
        '--x': `${flake.x}%`,
        '--size': `${flake.size}px`,
        '--opacity': flake.opacity,
        '--duration': `${flake.duration}s`,
        '--delay': `${flake.delay}s`,
        '--drift': `${flake.drift}px`,
        '--blur': `${flake.blur}px`,
      }"
    >❅</div>
  </div>
</template>

<style scoped>
.snowfall {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  overflow: hidden;
}

.snowflake {
  position: absolute;
  top: -20px;
  left: var(--x);
  font-size: var(--size);
  color: rgba(255, 255, 255, var(--opacity));
  filter: blur(var(--blur));
  animation: fall var(--duration) linear var(--delay) infinite;
  will-change: transform;
  text-shadow: 0 0 3px rgba(200, 220, 255, 0.5);
}

/* Larger distant flakes with more blur */
.snowflake:nth-child(7n) {
  filter: blur(1.5px);
  opacity: 0.4;
}

@keyframes fall {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  5% {
    opacity: var(--opacity);
  }
  90% {
    opacity: var(--opacity);
  }
  100% {
    transform: translateY(100vh) translateX(var(--drift)) rotate(360deg);
    opacity: 0;
  }
}
</style>
