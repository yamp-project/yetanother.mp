<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import type { RoadmapMedia } from "../../types/roadmap";

interface Props {
  media: RoadmapMedia[];
}

defineProps<Props>();

const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
const lightboxMedia = ref<RoadmapMedia | null>(null);

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  return match ? match[1] : null;
}

function getYouTubeThumbnail(url: string): string {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : '';
}

function openLightbox(item: RoadmapMedia, index: number) {
  lightboxMedia.value = item;
  lightboxIndex.value = index;
  lightboxOpen.value = true;
}

function closeLightbox() {
  lightboxOpen.value = false;
  lightboxMedia.value = null;
}
</script>

<template>
  <div class="flex flex-wrap gap-2 mb-4">
    <button
      v-for="(item, index) in media"
      :key="index"
      @click="openLightbox(item, index)"
      class="relative rounded-lg overflow-hidden border border-white/10 hover:border-purple-400 transition-colors group"
    >
      <!-- Image thumbnail -->
      <img
        v-if="item.type === 'image'"
        :src="item.thumbnail || item.src"
        :alt="item.alt || 'Roadmap media'"
        class="w-20 h-20 object-cover"
      />
      <!-- YouTube thumbnail -->
      <img
        v-else-if="item.type === 'youtube'"
        :src="item.thumbnail || getYouTubeThumbnail(item.src)"
        :alt="item.alt || 'YouTube video'"
        class="w-20 h-20 object-cover"
      />
      <!-- Video placeholder -->
      <div
        v-else
        class="w-20 h-20 bg-zinc-800 flex items-center justify-center"
      >
        <Icon icon="mdi:play-circle" class="w-8 h-8 text-white/60 group-hover:text-purple-400 transition-colors" />
      </div>
      <!-- Play overlay for videos -->
      <div
        v-if="item.type === 'video' || item.type === 'youtube'"
        class="absolute inset-0 bg-black/30 flex items-center justify-center"
      >
        <Icon :icon="item.type === 'youtube' ? 'mdi:youtube' : 'mdi:play'" class="w-6 h-6 text-white" />
      </div>
    </button>
  </div>

  <!-- Lightbox -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="lightboxOpen && lightboxMedia"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        @click.self="closeLightbox"
      >
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors z-10"
        >
          <Icon icon="mdi:close" class="w-8 h-8" />
        </button>

        <div class="max-w-4xl max-h-[90vh] mx-4 w-full">
          <!-- Image -->
          <img
            v-if="lightboxMedia.type === 'image'"
            :src="lightboxMedia.src"
            :alt="lightboxMedia.alt || 'Roadmap media'"
            class="max-w-full max-h-[90vh] object-contain rounded-lg mx-auto"
          />
          <!-- YouTube embed -->
          <div
            v-else-if="lightboxMedia.type === 'youtube'"
            class="aspect-video w-full max-w-4xl"
          >
            <iframe
              :src="`https://www.youtube.com/embed/${getYouTubeId(lightboxMedia.src)}?autoplay=1`"
              class="w-full h-full rounded-lg"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
          <!-- Video -->
          <video
            v-else
            :src="lightboxMedia.src"
            controls
            autoplay
            class="max-w-full max-h-[90vh] rounded-lg mx-auto"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
