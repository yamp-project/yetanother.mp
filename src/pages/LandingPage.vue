<script setup lang="ts">
import HeroSection from "../components/HeroSection.vue";
import StatsSection from "../components/StatsSection.vue";
import ScrollIndicator from "../components/ScrollIndicator.vue";
import HeroBottomBlur from "../components/HeroBottomBlur.vue";
import FeaturesSection from "../components/FeaturesSection.vue";
import AboutSection from "../components/AboutSection.vue";
import { useHead } from "@vueuse/head";

useHead({
  title: "YAMP – GTA V Multiplayer Client",
  meta: [
    {
      name: "description",
      key: "description",
      content:
        "YAMP is a modern, secure and community-driven GTA V multiplayer platform focused on stability and performance.",
    },
    {
      key: "og:title",
      property: "og:title",
      content: "YAMP – GTA V Multiplayer Client",
    },
    {
      key: "og:description",
      content:
        "YAMP is a modern, secure and community-driven GTA V multiplayer platform focused on stability and performance.",
    },
    { key: "og:url", property: "og:url", content: "https://yetanother.mp/" },
    { key: "og:image", property: "og:image", content: "/og-default.jpg" },
  ],
  link: [{ rel: "canonical", href: "https://yetanother.mp/" }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "YAMP",
        operatingSystem: "Windows, Linux",
        applicationCategory: "Game",
        url: "https://yetanother.mp",
        offers: {
          "@type": "Offer",
          price: "0", // marking price as 0 signals the app is free, which can surface a “Free · Download” badge in results.
          priceCurrency: "EUR",
        },
      }),
    },
  ],
});
</script>

<template>
  <div
    class="relative flex flex-col items-center justify-center min-h-[calc(100vh)] px-4"
  >
    <div
      class="w-[838px] h-[838px] max-w-full absolute left-1/2 top-[-738px] transform -translate-x-1/2 bg-gradient-to-b from-stone-400 to-purple-400 rounded-full blur-[374.50px] opacity-80 pointer-events-none"
    ></div>

    <HeroSection />
    <StatsSection />
    <ScrollIndicator />
  </div>
  <FeaturesSection />
  <AboutSection />
  <HeroBottomBlur class="absolute bottom-0" />
</template>
