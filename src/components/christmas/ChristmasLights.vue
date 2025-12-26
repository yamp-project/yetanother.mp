<script setup lang="ts">
import { ref, reactive } from 'vue';

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

const brokenBulbs = reactive(new Set<number>());
const explodingBulbs = reactive(new Set<number>());

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  velocity: number;
  size: number;
}

const particles = ref<Particle[]>([]);
let particleId = 0;

function breakBulb(bulbId: number, color: string, event: MouseEvent) {
  if (brokenBulbs.has(bulbId)) return;

  // Add to exploding set for the crack animation
  explodingBulbs.add(bulbId);

  // Get position relative to the component
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const containerRect = target.closest('.christmas-lights')?.getBoundingClientRect();

  if (!containerRect) return;

  const x = rect.left - containerRect.left + rect.width / 2;
  const y = rect.top - containerRect.top + rect.height / 2;

  // Create glass shard particles
  const newParticles: Particle[] = [];
  const particleCount = 8 + Math.floor(Math.random() * 5);

  for (let i = 0; i < particleCount; i++) {
    newParticles.push({
      id: particleId++,
      x,
      y,
      color,
      angle: (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5,
      velocity: 30 + Math.random() * 40,
      size: 2 + Math.random() * 3,
    });
  }

  particles.value.push(...newParticles);

  // Mark as broken after a tiny delay for the crack effect
  setTimeout(() => {
    brokenBulbs.add(bulbId);
    explodingBulbs.delete(bulbId);
  }, 100);

  // Clean up particles after animation
  setTimeout(() => {
    const idsToRemove = new Set(newParticles.map(p => p.id));
    particles.value = particles.value.filter(p => !idsToRemove.has(p.id));
  }, 600);
}
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
        :class="{
          'bulb-wrapper--broken': brokenBulbs.has(bulb.id),
          'bulb-wrapper--exploding': explodingBulbs.has(bulb.id)
        }"
        @click="breakBulb(bulb.id, bulb.color, $event)"
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
          v-if="!brokenBulbs.has(bulb.id)"
          class="bulb-glow"
          :style="{
            '--bulb-color': bulb.color,
            '--twinkle-delay': `${bulb.delay}s`,
          }"
        />
      </div>
    </div>

    <!-- Explosion particles -->
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="particle"
      :style="{
        '--start-x': `${particle.x}px`,
        '--start-y': `${particle.y}px`,
        '--end-x': `${particle.x + Math.cos(particle.angle) * particle.velocity}px`,
        '--end-y': `${particle.y + Math.sin(particle.angle) * particle.velocity + 20}px`,
        '--particle-color': particle.color,
        '--particle-size': `${particle.size}px`,
      }"
    />
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
  overflow: visible;
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
  pointer-events: auto;
  cursor: pointer;
  transition: transform 0.1s ease;
}

.bulb-wrapper:hover:not(.bulb-wrapper--broken) {
  transform: scale(1.15);
}

.bulb-wrapper:active:not(.bulb-wrapper--broken) {
  transform: scale(0.95);
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

/* Broken bulb states */
.bulb-wrapper--broken {
  cursor: default;
}

.bulb-wrapper--broken .bulb {
  background: linear-gradient(
    135deg,
    #2a2a2a 0%,
    #1a1a1a 100%
  );
  animation: none;
  opacity: 0.6;
}

.bulb-wrapper--broken .bulb::before {
  opacity: 0.2;
}

.bulb-wrapper--exploding .bulb {
  animation: shatter 0.1s ease-out forwards;
}

@keyframes shatter {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.3);
    opacity: 0.5;
  }
}

/* Explosion particles */
.particle {
  position: absolute;
  left: var(--start-x);
  top: var(--start-y);
  width: var(--particle-size);
  height: var(--particle-size);
  background: var(--particle-color);
  border-radius: 1px;
  pointer-events: none;
  animation: explode 0.5s ease-out forwards;
  box-shadow: 0 0 4px var(--particle-color);
}

@keyframes explode {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform:
      translate(
        calc(var(--end-x) - var(--start-x)),
        calc(var(--end-y) - var(--start-y))
      )
      rotate(360deg);
    opacity: 0;
  }
}

/* Responsive: fewer bulbs on mobile */
@media (max-width: 640px) {
  .bulb-wrapper:nth-child(2n) {
    display: none;
  }
}
</style>
