<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
</script>

<template>
  <!-- Scroll Down Indicator -->
  <div class="absolute bottom-8 flex flex-col items-center animate-bounce">
    <span class="text-sm text-white/60 mb-2">Scroll Down</span>
    <div
      class="w-8 h-8 border-2 border-white/60 rounded-full flex items-center justify-center"
    >
      <ChevronDown :size="16" class="text-white/60" />
    </div>
  </div>
</template>
