<script setup lang="ts">
import { computed } from "vue";
import TimelineEntry from "./TimelineEntry.vue";
import type { RoadmapEntry } from "../../types/roadmap";

interface Props {
  entries: RoadmapEntry[];
}

const props = defineProps<Props>();

// Calculate gradient based on entry statuses
const lineGradient = computed(() => {
  const total = props.entries.length;
  if (total === 0) return 'linear-gradient(to bottom, rgb(113 113 122 / 0.3), rgb(113 113 122 / 0.3))';

  // Count entries by status (entries are sorted chronologically)
  let completedCount = 0;
  let inProgressCount = 0;
  let plannedCount = 0;

  for (const entry of props.entries) {
    if (entry.status === 'completed') completedCount++;
    else if (entry.status === 'in-progress') inProgressCount++;
    else plannedCount++;
  }

  // Calculate percentage positions (centered on each section)
  const completedEnd = (completedCount / total) * 100;
  const inProgressEnd = ((completedCount + inProgressCount) / total) * 100;

  // Transition zone size (percentage)
  const transitionSize = 8;

  // Build gradient stops with smooth transitions
  const stops: string[] = [];
  const completedColor = 'rgb(168 85 247 / 0.7)';
  const inProgressColor = 'rgb(249 115 22 / 0.7)';
  const plannedColor = 'rgb(113 113 122 / 0.4)';

  if (completedCount > 0 && inProgressCount === 0 && plannedCount === 0) {
    // Only completed
    stops.push(`${completedColor} 0%`, `${completedColor} 100%`);
  } else if (inProgressCount > 0 && completedCount === 0 && plannedCount === 0) {
    // Only in-progress
    stops.push(`${inProgressColor} 0%`, `${inProgressColor} 100%`);
  } else if (plannedCount > 0 && completedCount === 0 && inProgressCount === 0) {
    // Only planned
    stops.push(`${plannedColor} 0%`, `${plannedColor} 100%`);
  } else {
    // Mixed statuses - smooth transitions
    if (completedCount > 0) {
      stops.push(`${completedColor} 0%`);
      stops.push(`${completedColor} ${Math.max(0, completedEnd - transitionSize)}%`);
    }

    if (inProgressCount > 0) {
      if (completedCount > 0) {
        stops.push(`${inProgressColor} ${completedEnd + transitionSize}%`);
      } else {
        stops.push(`${inProgressColor} 0%`);
      }
      stops.push(`${inProgressColor} ${Math.max(0, inProgressEnd - transitionSize)}%`);
    }

    if (plannedCount > 0) {
      const prevEnd = inProgressCount > 0 ? inProgressEnd : completedEnd;
      if (completedCount > 0 || inProgressCount > 0) {
        stops.push(`${plannedColor} ${prevEnd + transitionSize}%`);
      } else {
        stops.push(`${plannedColor} 0%`);
      }
      stops.push(`${plannedColor} 100%`);
    }
  }

  return `linear-gradient(to bottom, ${stops.join(', ')})`;
});
</script>

<template>
  <div class="relative w-full max-w-5xl mx-auto px-4">
    <!-- Desktop: Grid with center line -->
    <div class="hidden md:grid grid-cols-[1fr_auto_1fr] gap-4 relative">
      <!-- Vertical line -->
      <div
        class="absolute left-2 top-0 bottom-0 w-0.5 -translate-x-1/2"
        :style="{ background: lineGradient, gridColumn: 2 }"
      ></div>

      <template v-for="(entry, index) in entries" :key="entry.id">
        <TimelineEntry :entry="entry" :index="index" />
      </template>
    </div>

    <!-- Mobile: Stacked with left line -->
    <div class="md:hidden relative">
      <!-- Vertical line on left -->
      <div
        class="absolute left-[7px] top-0 bottom-0 w-0.5"
        :style="{ background: lineGradient }"
      ></div>

      <div v-for="(entry, index) in entries" :key="entry.id">
        <TimelineEntry :entry="entry" :index="index" />
      </div>
    </div>
  </div>
</template>
