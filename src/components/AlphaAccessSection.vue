<script setup lang="ts">
import { useAuth } from "../composables/useAuth";
import UserProfile from "./UserProfile.vue";
import { Heart, Lock } from "lucide-vue-next";

const { user } = useAuth();
</script>

<template>
  <section class="py-20 px-4" id="alpha">
    <div class="max-w-4xl mx-auto text-center">
      
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-white/10 mb-6">
        <Lock class="text-zinc-500" :size="28" />
      </div>

      <h2 class="text-3xl md:text-4xl font-bold mb-6 text-white">
        Alpha Program Closed
      </h2>
      
      <p class="text-white/60 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
        Following the recent project update, the YAMP Alpha Testing Program is <strong>no longer available</strong>. We have disabled all new applications and access requests as we cease development on the GTA V branch.
      </p>

      <div v-if="user" class="mb-12 flex flex-col items-center gap-4">
        <UserProfile />
        <span class="text-xs uppercase tracking-widest text-zinc-500 font-medium">Session Active</span>
      </div>

      <div class="bg-zinc-900/40 border border-white/5 rounded-2xl p-8 max-w-2xl mx-auto relative overflow-hidden">
        <div class="relative z-10">
          <Heart class="text-red-500 mx-auto mb-4 animate-pulse" :size="32" />
          <h3 class="text-white font-bold text-xl mb-3">Thank You, Yampers</h3>
          <p class="text-zinc-400 text-sm sm:text-base">
            To everyone who applied, tested, and provided feedback: your support was the heartbeat of this project. While we can't move forward with our current vision for GTA V, we are incredibly grateful for the community that formed around YAMP.
          </p>
        </div>
        
        <div class="absolute -bottom-12 -right-12 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full"></div>
      </div>

      <p class="mt-10 text-zinc-500 text-sm">
        Stay tuned to our Discord for any future updates regarding new paths.
      </p>
    </div>
  </section>
</template>