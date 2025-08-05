<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center px-4 py-12 h-full min-h-[calc(100vh-113px)] md:min-h-[calc(100vh-73px)]">
    <h1 class="text-7xl font-bold text-white mb-6">404</h1>
    <p class="text-white/60 mb-8 max-w-md">The page you're looking for doesn't exist or has been moved.</p>
    <router-link
      to="/"
      class="flex items-center gap-2 px-4 py-2 rounded-[10px] font-semibold transition-colors text-white bg-purple-400 hover:bg-purple-500"
    >
      <ArrowLeft :size="20"/>
      Go Back Home
    </router-link>
  </div>
</template>