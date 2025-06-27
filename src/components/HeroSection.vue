<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const suffixes = ['*','ultiplayer', 'odification', 'odding']
const currentIndex = ref(0)

let timer: ReturnType<typeof setTimeout>

const cycle = () => {
  timer = setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % suffixes.length
    cycle()
  }, 2500)
}

onMounted(() => cycle())
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <div class="text-center max-w-4xl mx-auto mt-20 mb-16">
    <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
      <!-- Top line offset to align "Another" with "Platform" -->
      <div class="flex justify-center items-baseline" style="transform: translateX(28px);">
        <span class="mr-4">Yet</span>
        <span>Another</span>
      </div>
      <div class="flex justify-center items-baseline" style="transform: translateX(73px) translateY(10px);">
        <span class="relative overflow-hidden inline-block h-[1.3em] w-[12ch]">
          <div
            class="transition-transform duration-700 ease-in-out"
            :style="{ transform: `translateY(-${currentIndex * 1.3}em)` }"
          >
            <div
              v-for="(suffix, i) in suffixes"
              :key="i"
              class="h-[1.3em] flex items-baseline"
            >
              <span class="text-purple-400 font-bold">M</span>
              <span class="text-purple-400 font-bold">{{ suffix }}</span>
            </div>
          </div>
        </span>
      </div>
      <div class="mt-2">Platform.</div>
    </h1>

    <p class="text-white/60 text-base sm:text-lg mb-18">
      The competitive GTA V multiplayer client — scalable, fast, and built for performance.
    </p>

    <div class="flex flex-col gap-4 mb-3">
      <span class="text-4xl font-bold">Coming soon</span>
    </div>

    <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href="https://discord.gg/yamp"
        target="_blank"
        class="px-8 py-4 bg-purple-400 rounded-lg font-semibold flex items-center space-x-3 hover:opacity-90 transition-opacity text-neutral-900"
      >
        <span class="text-white">Follow us on Discord</span>
        <Icon class="text-white mt-1" icon="simple-icons:discord" width="20" />
      </a>
    </div>
  </div>
</template>