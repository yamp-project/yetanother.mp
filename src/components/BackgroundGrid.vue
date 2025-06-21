<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";

interface MousePosition {
  x: number | null;
  y: number | null;
}

interface GridCell {
  path: string;
  color: string;
  opacity: number;
  strokeWidth: number;
}

const gridContainer: Ref<HTMLDivElement | null> = ref(null);
const mousePosition: MousePosition = reactive({ x: null, y: null });
const smoothedPos: { x: number; y: number } = reactive({ x: 0, y: 0 });
const isMouseActive: Ref<boolean> = ref(false);
const SMOOTHING_FACTOR = 0.12; // lower = longer delay

// Grid configuration constants
const GRID_WIDTH: number = 144;
const GRID_HEIGHT: number = 96;
const DIAMOND_HALF_WIDTH: number = 72;
const DIAMOND_HALF_HEIGHT: number = 48;

function handleMouseLeave(): void {
  isMouseActive.value = false;
  setTimeout(() => {
    if (!isMouseActive.value) {
      mousePosition.x = null;
      mousePosition.y = null;
    }
  }, 300);
}

// Throttled mouse tracking with performance optimization
let throttleId: number | null = null;
function handleMouseMove(event: MouseEvent): void {
  if (throttleId) return;
  throttleId = requestAnimationFrame(() => {
    if (!gridContainer.value) return;
    const rect = gridContainer.value.getBoundingClientRect();
    mousePosition.x = event.clientX - rect.left;
    mousePosition.y = event.clientY - rect.top;
    isMouseActive.value = true;
    throttleId = null;
  });
}

function animateSmooth(): void {
  if (mousePosition.x !== null && mousePosition.y !== null) {
    smoothedPos.x += (mousePosition.x - smoothedPos.x) * SMOOTHING_FACTOR;
    smoothedPos.y += (mousePosition.y - smoothedPos.y) * SMOOTHING_FACTOR;
  }
  requestAnimationFrame(animateSmooth);
}

// Calculate which grid cells should be highlighted
const highlightedCells = computed((): GridCell[] => {
  const cells: GridCell[] = [];
  const containerRect = gridContainer.value?.getBoundingClientRect();
  if (!containerRect) return [];

  const influence: number = 300; // wider influence for smoother fade

  // Iterate over every visible grid cell to keep elements stable
  for (let x = 0; x <= containerRect.width; x += GRID_WIDTH) {
    for (let y = 0; y <= containerRect.height; y += GRID_HEIGHT) {
      const centerX: number = x + DIAMOND_HALF_WIDTH;
      const centerY: number = y + DIAMOND_HALF_HEIGHT;

      // Calculate distance from mouse to cell center (use null-safe fallback)
      let distance = Infinity;
      if (smoothedPos.x !== null && smoothedPos.y !== null) {
        distance = Math.sqrt(
          Math.pow(smoothedPos.x - centerX, 2) +
            Math.pow(smoothedPos.y - centerY, 2)
        );
      }

      // Calculate intensity (smooth fade) – 0 outside influence
      const intensity: number = Math.max(0, 1 - distance / influence);

      const opacity: number = intensity * 0.5; // subtler
      const strokeWidth: number = 1 + intensity * 0.5; // subtle variation 1–1.5

      // Create diamond path
      const path: string = `M${centerX},${y} L${
        x + GRID_WIDTH
      },${centerY} L${centerX},${y + GRID_HEIGHT} L${x},${centerY} Z`;

      const color: string = "#ce93ff";

      cells.push({ path, color, opacity, strokeWidth });
    }
  }

  return cells;
});

onMounted((): void => {
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  animateSmooth();
});

onUnmounted((): void => {
  window.removeEventListener("mousemove", handleMouseMove);
  if (throttleId !== null) {
    cancelAnimationFrame(throttleId);
  }
});
</script>

<template>
  <div
    class="absolute top-0 left-0 inset-0 w-full h-full"
    @mouseleave="handleMouseLeave"
    ref="gridContainer"
  >
    <!-- Base grid -->
    <svg
      class="absolute inset-0 w-full h-full opacity-20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="diamond-grid"
          x="0"
          y="0"
          width="144"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <!-- Diamond outline -->
          <path
            d="M72,0 L144,48 L72,96 L0,48 Z"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            stroke-width="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diamond-grid)" />
    </svg>

    <!-- Interactive overlay -->
    <svg
      class="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Highlighted grid cells -->
      <g v-if="isMouseActive">
        <path
          v-for="cell in highlightedCells"
          :key="cell.path"
          :d="cell.path"
          fill="none"
          :stroke="cell.color"
          :stroke-width="cell.strokeWidth"
          :opacity="cell.opacity"
          class="transition-all duration-200 ease-out"
        />
      </g>
    </svg>
  </div>
</template>
