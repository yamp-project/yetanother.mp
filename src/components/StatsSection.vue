<script setup lang="ts">
import { ref } from "vue";

const discordMembers = ref(2642);
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 md:gap-24 text-center mb-20"
  >
    <div>
      <div class="text-3xl sm:text-4xl font-bold mb-2">
        {{ discordMembers }}
      </div>
      <div class="text-white/60">Members on Discord</div>
    </div>
    <div>
      <div class="text-3xl sm:text-4xl font-bold mb-2">Pre-Alpha</div>
      <div class="text-white/60">Current Phase</div>
    </div>
    <div>
      <div class="text-3xl sm:text-4xl font-bold mb-2">js / lua</div>
      <div class="text-white/60">Supported Languages</div>
    </div>
  </div>
</template>
