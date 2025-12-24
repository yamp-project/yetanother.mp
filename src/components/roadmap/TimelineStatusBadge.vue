<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { statusConfigMap, type RoadmapStatus } from "../../types/roadmap";

interface Props {
  status: RoadmapStatus;
  size?: "sm" | "md";
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
});

const config = computed(() => statusConfigMap[props.status]);

const sizeClasses = computed(() =>
  props.size === "sm" ? "px-2 py-1 text-xs gap-1" : "px-3 py-1.5 text-sm gap-1.5"
);
</script>

<template>
  <div
    :class="[
      'inline-flex items-center rounded-full font-medium border',
      config.bgClass,
      config.textClass,
      config.borderClass,
      sizeClasses,
    ]"
  >
    <Icon :icon="config.icon" class="w-4 h-4" />
    <span>{{ config.text }}</span>
  </div>
</template>
