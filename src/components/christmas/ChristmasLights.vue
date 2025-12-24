<script setup lang="ts">
const bulbColors = [
  '#ff4757', // warm red
  '#2ed573', // festive green
  '#ffa502', // golden amber
  '#3742fa', // royal blue
  '#fff5cc', // warm white
  '#ff6b9d', // pink
  '#70a1ff', // ice blue
];

const bulbs = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  color: bulbColors[i % bulbColors.length],
  delay: (i * 0.15) % 2,
}));
</script>

<template>
  <div class="christmas-lights" aria-hidden="true">
    <!-- The wire/cable -->
    <svg class="wire" viewBox="0 0 1000 30" preserveAspectRatio="none">
      <path
        d="M0,5 Q50,20 100,5 Q150,20 200,5 Q250,20 300,5 Q350,20 400,5 Q450,20 500,5 Q550,20 600,5 Q650,20 700,5 Q750,20 800,5 Q850,20 900,5 Q950,20 1000,5"
        fill="none"
        stroke="#1a1a1a"
        stroke-width="2"
      />
    </svg>

    <!-- The bulbs -->
    <div class="bulbs">
      <div
        v-for="bulb in bulbs"
        :key="bulb.id"
        class="bulb-wrapper"
      >
        <div class="bulb-cap" />
        <div
          class="bulb"
          :style="{
            '--bulb-color': bulb.color,
            '--twinkle-delay': `${bulb.delay}s`,
          }"
        />
        <div
          class="bulb-glow"
          :style="{
            '--bulb-color': bulb.color,
            '--twinkle-delay': `${bulb.delay}s`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.christmas-lights {
  position: absolute;
  bottom: -12px;
  left: 20px;
  right: 20px;
  height: 28px;
  pointer-events: none;
}

.wire {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
}

.bulbs {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.bulb-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bulb-cap {
  width: 6px;
  height: 6px;
  background: linear-gradient(to bottom, #4a4a4a, #2a2a2a);
  border-radius: 1px 1px 0 0;
  z-index: 2;
}

.bulb {
  width: 10px;
  height: 14px;
  background: linear-gradient(
    135deg,
    var(--bulb-color) 0%,
    color-mix(in srgb, var(--bulb-color) 70%, black) 100%
  );
  border-radius: 3px 3px 50% 50%;
  position: relative;
  animation: twinkle 2s ease-in-out var(--twinkle-delay) infinite;
}

.bulb::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 3px;
  height: 4px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  border-radius: 50%;
}

.bulb-glow {
  position: absolute;
  top: 6px;
  width: 20px;
  height: 20px;
  background: radial-gradient(
    circle,
    var(--bulb-color) 0%,
    transparent 70%
  );
  opacity: 0.6;
  filter: blur(6px);
  animation: glow 2s ease-in-out var(--twinkle-delay) infinite;
  z-index: -1;
}

@keyframes twinkle {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.4);
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.3);
  }
}

/* Responsive: fewer bulbs on mobile */
@media (max-width: 640px) {
  .bulb-wrapper:nth-child(2n) {
    display: none;
  }
}
</style>
