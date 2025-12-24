<script setup lang="ts">
import { useHead } from "@vueuse/head";
import RoadmapHero from "../components/roadmap/RoadmapHero.vue";
import RoadmapTimeline from "../components/roadmap/RoadmapTimeline.vue";
import { getSortedEntries } from "../data/roadmapEntries";

const entries = getSortedEntries("asc");

useHead({
  title: "Roadmap - YAMP",
  meta: [
    {
      name: "description",
      key: "description",
      content:
        "Explore the YAMP development roadmap. See what we've accomplished, what we're working on, and our plans for the future.",
    },
    {
      key: "og:title",
      property: "og:title",
      content: "Roadmap - YAMP",
    },
    {
      key: "og:description",
      property: "og:description",
      content:
        "Explore the YAMP development roadmap. See what we've accomplished, what we're working on, and our plans for the future.",
    },
    {
      key: "og:url",
      property: "og:url",
      content: "https://yetanother.mp/roadmap",
    },
  ],
  link: [{ rel: "canonical", href: "https://yetanother.mp/roadmap" }],
});
</script>

<template>
  <div class="pt-32 pb-20">
    <RoadmapHero />
    <RoadmapTimeline :entries="entries" />
  </div>
</template>
