<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "mdi:script-text-outline",
    title: "Rich Developer APIs",
    description:
      "Comprehensive scripting interfaces so creators can build new experiences quickly.",
  },
  {
    icon: "mdi:speedometer",
    title: "Optimized Performance",
    description:
      "Focus on smooth and efficient gameplay across a range of hardware.",
  },
  {
    icon: "mdi:sync",
    title: "Server-Side Authority",
    description:
      "Server-side authority and competitive synchronization for high player loads.",
  },
  {
    icon: "mdi:account-circle-outline",
    title: "Accessible Modding",
    description:
      "Designed to be approachable for modders, communities, and newcomers alike.",
  },
  {
    icon: "mdi:shield-check",
    title: "Built-in Anti-Cheat",
    description:
      "Integrated security measures to protect both players and developers.",
  },
];
</script>

<template>
  <section class="w-full max-w-6xl mx-auto mb-20 px-4">
    <h2 class="text-center text-3xl sm:text-4xl font-bold mb-12">Why YAMP?</h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
    >
      <div
        v-for="feature in features"
        :key="feature.title"
        class="bg-white/5 rounded-xl p-6 backdrop-blur-md border text-center border-white/10 hover:border-purple-400 transition-colors"
      >
        <Icon
          :icon="feature.icon"
          width="48"
          class="text-purple-400 mb-4 mx-auto"
        />
        <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
        <p class="text-white/60 text-sm leading-relaxed">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </section>
</template>
