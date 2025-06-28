<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="text-center max-w-4xl mx-auto mt-20 mb-16">
    <h1 class="text-5xl md:text-6xl font-bold mb-6 mt-10 sm:mt-0">
      Yet Another
      <span class="text-purple-400">M*</span>
      Platform.
    </h1>
    <p class="text-white/60 text-base sm:text-lg mb-18">
      The competitive GTA V multiplayer client — scalable, fast, and built for
      performance.
    </p>

    <div class="flex flex-col gap-4 mb-3">
      <span class="text-4xl font-bold">Coming soon</span>
    </div>
    <div
      class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      <a
        href="https://discord.gg/yamp"
        target="_blank"
        class="px-8 py-4 bg-purple-400 rounded-lg font-semibold flex items-center space-x-3 hover:opacity-90 transition-opacity text-neutral-900"
      >
        <span class="text-white">Follow us on Discord</span>
        <Icon class="text-white mt-1" icon="simple-icons:discord" width="20" />
      </a>

      <!-- <button
        class="bg-white/10 backdrop-blur px-8 py-4 rounded-lg font-semibold flex items-center space-x-3 hover:bg-white/15 transition-colors"
      >
        <span>Create Server</span>
        <ArrowRight :size="20" />
      </button> -->
    </div>
  </div>
</template>
