<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import TimelineStatusBadge from "./TimelineStatusBadge.vue";
import TimelineMedia from "./TimelineMedia.vue";
import { statusConfigMap, type RoadmapEntry } from "../../types/roadmap";

interface Props {
  entry: RoadmapEntry;
  index: number;
}

const props = defineProps<Props>();

const isLeft = computed(() => props.index % 2 === 0);

const dotColor = computed(() => statusConfigMap[props.entry.status].dotColor);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<template>
  <!-- Desktop layout -->
  <div class="hidden md:contents">
    <!-- Left content (even index) -->
    <div
      :class="[
        'flex',
        isLeft ? 'justify-end' : 'justify-start opacity-0 pointer-events-none',
        index > 0 ? '-mt-16' : '',
      ]"
    >
      <div
        v-if="isLeft"
        class="timeline-entry bg-white/5 rounded-xl p-6 backdrop-blur-md border border-white/10 hover:border-purple-400 transition-colors max-w-md"
      >
        <div class="flex items-center gap-3 mb-3">
          <Icon
            v-if="entry.icon"
            :icon="entry.icon"
            class="w-6 h-6 text-purple-400"
          />
          <span class="text-white/50 text-sm">{{ formatDate(entry.date) }}</span>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">{{ entry.title }}</h3>
        <p class="text-white/60 text-sm leading-relaxed mb-4">
          {{ entry.description }}
        </p>
        <TimelineMedia v-if="entry.media?.length" :media="entry.media" />
        <div class="flex justify-center">
          <div class="flex justify-center rounded-full -mb-10.5 bg-[#161617] w-fit">
            <TimelineStatusBadge :status="entry.status" size="md" />
          </div>
        </div>
      </div>
    </div>

    <!-- Center line with dot -->
    <div :class="['flex flex-col items-center justify-center', index > 0 ? '-mt-16' : '']">
      <div
        :class="['w-4 h-4 rounded-full border-4 border-zinc-950 z-10', dotColor]"
      ></div>
    </div>

    <!-- Right content (odd index) -->
    <div
      :class="[
        'flex',
        !isLeft ? 'justify-start' : 'justify-end opacity-0 pointer-events-none',
        index > 0 ? '-mt-16' : '',
      ]"
    >
      <div
        v-if="!isLeft"
        class="timeline-entry bg-white/5 rounded-xl p-6 backdrop-blur-md border border-white/10 hover:border-purple-400 transition-colors max-w-md"
      >
        <div class="flex items-center gap-3 mb-3">
          <Icon
            v-if="entry.icon"
            :icon="entry.icon"
            class="w-6 h-6 text-purple-400"
          />
          <span class="text-white/50 text-sm">{{ formatDate(entry.date) }}</span>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">{{ entry.title }}</h3>
        <p class="text-white/60 text-sm leading-relaxed mb-4">
          {{ entry.description }}
        </p>
        <TimelineMedia v-if="entry.media?.length" :media="entry.media" />
        <div class="flex justify-center">
          <div class="flex justify-center rounded-full -mb-10.5 bg-[#161617] w-fit">
            <TimelineStatusBadge :status="entry.status" size="md" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile layout -->
  <div class="md:hidden flex gap-4">
    <!-- Line with dot -->
    <div class="flex flex-col items-center">
      <div
        :class="['w-4 h-4 rounded-full border-4 border-zinc-950 z-10 shrink-0', dotColor]"
      ></div>
    </div>

    <!-- Content -->
    <div
      class="timeline-entry flex-1 bg-white/5 rounded-xl p-5 backdrop-blur-md border border-white/10 hover:border-purple-400 transition-colors mb-4"
    >
      <div class="flex items-center gap-3 mb-3">
        <Icon
          v-if="entry.icon"
          :icon="entry.icon"
          class="w-5 h-5 text-purple-400"
        />
        <span class="text-white/50 text-sm">{{ formatDate(entry.date) }}</span>
      </div>
      <h3 class="text-lg font-semibold text-white mb-2">{{ entry.title }}</h3>
      <p class="text-white/60 text-sm leading-relaxed mb-4">
        {{ entry.description }}
      </p>
      <TimelineMedia v-if="entry.media?.length" :media="entry.media" />
      <div class="flex justify-center">
        <div class="flex justify-center rounded-full -mb-10.5 bg-[#161617] w-fit">
          <TimelineStatusBadge :status="entry.status" size="md" />
        </div>
      </div>
    </div>
  </div>
</template>
