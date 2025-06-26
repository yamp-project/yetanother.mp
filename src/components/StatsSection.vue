<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 md:gap-24 text-center mb-20">
    <div>
      <div class="text-3xl sm:text-4xl font-bold mb-2">{{ discordMembers }}</div>
      <div class="text-white/60">Members on Discord</div>
    </div>
    <div>
      <div class="text-3xl sm:text-4xl font-bold mb-2">{{ activeServers }}</div>
      <div class="text-white/60">Active Servers</div>
    </div>
    <div>
      <div class="text-3xl sm:text-4xl font-bold mb-2">{{ activePlayers }}</div>
      <div class="text-white/60">Players In Game</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const discordMembers = ref(2642)
const activeServers = ref(5)
const activePlayers = ref(9)
// Simulated data cause why not 
onMounted(() => {
  setInterval(() => {
    activeServers.value = Math.floor(Math.random() * 12)
    activePlayers.value = activeServers.value * (Math.floor(Math.random() * 10) + 10)
  }, 5000)
})
</script>
