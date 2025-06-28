<script setup lang="ts">
import heroBlurImage from "@/assets/hero-bottom-blur.webp";
</script>

<template>
  <div class="hero-bottom-blur">
    <Transition name="blur-fade" appear>
      <img
        :src="heroBlurImage"
        alt=""
        width="1920"
        height="387"
        loading="lazy"
        style="width: 100%; height: auto; display: block"
      />
    </Transition>
  </div>
</template>

<style scoped>
.hero-bottom-blur {
  width: 100%;
  overflow: hidden;
}

.hero-bottom-blur img {
  -webkit-user-drag: none;
  position: relative;
  z-index: 0;
}

/* Fade-in animation */
.blur-fade-enter-active {
  transition: all 1.2s ease-out;
}

.blur-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.blur-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
