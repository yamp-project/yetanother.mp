<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="text-center max-w-4xl mx-auto mt-30 mb-16">
    <h1 class="text-5xl md:text-6xl font-bold mb-6 mt-10 sm:mt-0">
      Yet Another
      <span class="text-purple-400">M*</span>
      Platform.
    </h1>
    <p class="text-white/60 text-base sm:text-lg mb-2">
      The next-gen unofficial GTA V multiplayer client — scalable, fast, and built for
      performance.
    </p>

    <div class="max-w-2xl mx-auto text-center py-12 px-4">
      <p class="text-red-500/60 text-base font-bold sm:text-lg mb-4 tracking-widest">
        PROJECT UPDATE
      </p>

      <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-6">
        YAMP has been discontinued.
      </h1>

      <p class="text-gray-400 text-lg mb-10 leading-relaxed">
        Due to a legal demand from <span class="text-white font-semibold">Take-Two Interactive</span>, we have been
        forced to cease all development and terminate activity surrounding YAMP effective immediately.
      </p>



      <RouterLink to="/shutdown"
        class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 shadow-lg">
        Read the Full Announcement
      </RouterLink>
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a href="https://discord.gg/rMS8uWkvqK" target="_blank"
        class="px-8 py-4 bg-purple-400 rounded-lg font-semibold flex items-center space-x-3 hover:opacity-90 transition-opacity text-neutral-900">
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
