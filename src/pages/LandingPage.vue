<script setup lang="ts">
import HeroSection from "../components/HeroSection.vue";
import StatsSection from "../components/StatsSection.vue";
import ScrollIndicator from "../components/ScrollIndicator.vue";
import HeroBottomBlur from "../components/HeroBottomBlur.vue";
</script>

<template>
  <div
    class="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4"
  >
    <!-- Top gradient blur effect -->
    <div
      class="w-[838px] h-[838px] absolute left-1/2 top-[-738px] transform -translate-x-1/2 bg-gradient-to-b from-stone-400 to-purple-400 rounded-full blur-[374.50px] opacity-80 pointer-events-none"
    ></div>

    <HeroSection />
    <StatsSection />
    <ScrollIndicator />
    <HeroBottomBlur class="absolute bottom-0" />
  </div>
</template>

<style scoped>
/* Page-specific styles, if any, can go here */
</style>
