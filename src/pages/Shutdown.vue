<script setup lang="ts">
import { ArrowLeft, Scale, AlertTriangle, History } from "lucide-vue-next";
</script>

<template>
  <div class="min-h-screen text-zinc-300 selection:bg-red-500/30 py-30 px-6">
    <div class="max-w-3xl mx-auto">
      
      <router-link to="/" class="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group">
        <ArrowLeft :size="18" class="group-hover:-translate-x-1 transition-transform" />
        Return to Home
      </router-link>

      <header class="mb-12">
        <div class="flex items-center gap-3 text-red-500 mb-4">
          <Scale :size="24" />
          <span class="font-bold tracking-widest uppercase text-sm">IMPORTANT</span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Project Termination Notice
        </h1>
        <p class="text-zinc-500 text-lg">
          Official statement regarding YAMP and Take-Two Interactive.
        </p>
      </header>

      <div class="space-y-8 leading-relaxed text-zinc-300">
        
        <section class="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 sm:p-8">
          <div class="flex items-start gap-4">
            <AlertTriangle class="text-red-500 shrink-0 mt-1" :size="20" />
            <div>
              <h2 class="text-white font-bold text-xl mb-2">Final Outcome</h2>
              <p>
                Following our initial announcement on <span class="text-white">January 13, 2026</span>, we attempted to engage in a dialogue with Take-Two Interactive to clarify our non-commercial goals. 
              </p>
              <p class="mt-4">
                Unfortunately, no formal response or resolution was reached. In adherence to our commitment to act in good faith and avoid legal escalation, we have made the difficult decision to <strong>permanently terminate</strong> the GTA V branch of YAMP.
              </p>
            </div>
          </div>
        </section>

        <section class="space-y-6">
          <div class="flex items-center gap-3 text-zinc-500">
            <History :size="18" />
            <span class="text-sm font-semibold uppercase tracking-wider">Official Statement — January 13, 2026</span>
          </div>

          <div class="prose prose-invert prose-zinc max-w-none">
            <p>
              It is with great sadness that we announce we have received a Cease & Desist letter from Take-Two Interactive. We were given 10 days to respond to this notice. For those unfamiliar, a Cease & Desist is a formal request requesting us to immediately halt development of the project and to agree not to infringe on Take-Two’s intellectual property in the future.
            </p>
            
            <p>
              We took this matter seriously and acted in good faith to comply with the notice while seeking clarification and dialogue. Effectively immediately at that time, we officially paused all development of the project while we explored the possibility of reaching a positive resolution.
            </p>

            <blockquote class="border-l-2 border-zinc-700 pl-6 italic text-zinc-400">
              "This situation is particularly disappointing, as we have always been transparent about our intentions. The project has always been free and strictly non-commercial, which is why donations were never accepted."
            </blockquote>

            <p>
              We believe the project was misunderstood. The Cease & Desist letter included claims that were not aligned with our goals or intentions. However, as we were unable to reach an agreement, we are following through on our original promise: <strong>we will not pursue any other Take-Two Interactive or Rockstar Games IPs in the future.</strong>
            </p>
          </div>
        </section>

        <hr class="border-zinc-800" />

        <footer class="text-center pt-8">
          <p class="text-zinc-500 mb-6">
            Thank you for standing with us. While this chapter of YAMP is closed, we are exploring other paths forward outside of the Rockstar Games ecosystem.
          </p>
          <div class="pt-10 text-5xl font-black uppercase">
            #freeyamp
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>