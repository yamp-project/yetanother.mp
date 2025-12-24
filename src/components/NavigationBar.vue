<script setup lang="ts">
import { ref } from "vue";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-vue-next";
import { Icon } from "@iconify/vue";
import AlphaAccessButton from "./AlphaAccessButton.vue";
import StatusBadge from "./StatusBadge.vue";
import UserProfile from "./UserProfile.vue";
import ChristmasLights from "./christmas/ChristmasLights.vue";
import { useAuth } from "../composables/useAuth";
import router from "../router";

const { 
  user, 
  alphaApplication, 
} = useAuth();

const isMenuOpen = ref(false);
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function goToAlphaSection() {
  router.push({ hash: '#alpha' });
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 flex justify-center items-center z-50">
    <div
      class="relative w-full h-16 px-4 m-4.5 sm:px-5 rounded-[10px] outline outline-offset-[-1px] outline-white/10 flex justify-between items-center nav-with-grid backdrop-blur"
    >
      <!-- Christmas Lights -->
      <ChristmasLights />
      <div class="flex justify-start items-center gap-4 sm:gap-10">
        <!-- Logo -->
        <RouterLink to="/">
          <div class="flex justify-center items-center gap-2.5">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.6142 26.2313C19.6901 27.8889 17.3055 27.8892 16.381 26.2318L10.9763 16.5429C10.0905 14.9549 11.2385 13 13.0569 13C13.9143 13 14.7055 13.4607 15.1287 14.2064L20.6051 23.8549C21.0229 24.5911 21.0264 25.4919 20.6142 26.2313Z"
                fill="#BC82F3"
              />
              <path
                d="M26.133 16.4382C26.9738 14.8865 25.8504 13 24.0856 13C22.2823 13 21.1633 14.9614 22.0809 16.5137C23.002 18.0719 25.2707 18.0296 26.133 16.4382Z"
                fill="#BC82F3"
              />
              <path
                d="M37.0587 16.5353C37.9321 14.9448 36.7813 13 34.9668 13C34.0966 13 33.2953 13.4736 32.8758 14.236L22.1288 33.767C21.7421 34.4697 21.7326 35.3193 22.1035 36.0304C22.9885 37.7273 25.4075 37.7532 26.3287 36.0757L37.0587 16.5353Z"
                fill="#BC82F3"
              />
            </svg>
          </div>
        </RouterLink>
      </div>

      <!-- Right Side Links -->
      <div class="hidden sm:flex justify-center items-center gap-2.5">
        <!-- <RouterLink
          to="/roadmap"
          class="flex justify-center items-center px-3 py-2 rounded-[10px] hover:bg-white/10 transition-colors text-white text-sm font-medium"
        >
          Roadmap
        </RouterLink> -->
        <a
          href="https://discord.gg/invite/yamp"
          target="_blank"
          rel="noopener noreferrer"
          class="flex justify-center items-center p-2 rounded-[10px] hover:bg-white/10 transition-colors text-white"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"
            />
          </svg>
        </a>
        <a
          href="https://github.com/yamp-project"
          target="_blank"
          rel="noopener noreferrer"
          class="flex justify-center items-center p-2 rounded-[10px] hover:bg-white/10 transition-colors text-white"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504c.5.092.682-.217.682-.483c0-.237-.008-.868-.013-1.703c-2.782.605-3.369-1.343-3.369-1.343c-.454-1.158-1.11-1.466-1.11-1.466c-.908-.62.069-.608.069-.608c1.003.07 1.531 1.032 1.531 1.032c.892 1.53 2.341 1.088 2.91.832c.092-.647.35-1.088.636-1.338c-2.22-.253-4.555-1.113-4.555-4.951c0-1.093.39-1.988 1.029-2.688c-.103-.253-.446-1.272.098-2.65c0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027c.546 1.379.202 2.398.1 2.651c.64.7 1.028 1.595 1.028 2.688c0 3.848-2.339 4.695-4.566 4.943c.359.309.678.92.678 1.855c0 1.338-.012 2.419-.012 2.747c0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
        </a>
        <a
          href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
          target="_blank"
          rel="noopener noreferrer"
          class="flex justify-center items-center p-2 rounded-[10px] hover:bg-white/10 transition-colors text-white"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 320 244"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M101.313 172.793L0 0H58.0695L130.965 122.189L101.313 172.793Z"
              fill="white"
            />
            <path
              d="M202.625 0H117.375L139.614 35.7928L161.853 71.5856L202.625 0Z"
              fill="white"
            />
            <path
              d="M320 0H261.93L133.436 222.162L161.853 274L320 0Z"
              fill="white"
            />
          </svg>
        </a>

        <!-- Closed alpha / login button (desktop) -->
        <UserProfile v-if="user" compact />
        <div class="flex flex-col" v-if="user && alphaApplication.applied" >
          <span class="text-[10px] text-center font-medium uppercase text-[#a87fcd] tracking-[0.9px]">Alpha Status</span>
          <StatusBadge
            :status="alphaApplication.status" 
            size="sm"

            class="cursor-pointer"
            @click="goToAlphaSection"
          />
        </div>
      </div>

      <!-- Hamburger button (mobile) -->
      <button
        @click="toggleMenu"
        class="md:hidden p-2.5 flex items-center justify-center hover:bg-white/5 rounded transition-colors"
      >
        <MenuIcon v-if="!isMenuOpen" :size="24" class="text-white" />
        <CloseIcon v-else :size="24" class="text-white" />
      </button>
    </div>
  </nav>

  <transition name="slide-fade">
    <div
      v-if="isMenuOpen"
      class="fixed top-16 left-0 right-0 bg-zinc-900/95 backdrop-blur py-4 md:hidden z-40"
    >
      <div class="flex flex-col px-4 gap-2">
        <!-- <RouterLink
          to="/roadmap"
          class="flex items-center gap-2 p-2 rounded hover:bg-white/5 transition-colors"
          @click="toggleMenu"
        >
          <Icon icon="mdi:map-marker-path" class="w-5 h-5 text-white" />
          <span class="text-white">Roadmap</span>
        </RouterLink> -->
        <a
          href="https://discord.gg/invite/yamp"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 p-2 rounded hover:bg-white/5 transition-colors"
          @click="toggleMenu"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"
            />
          </svg>
          <span class="text-white">Discord</span>
        </a>
        <a
          href="https://github.com/yamp-project"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 p-2 rounded hover:bg-white/5 transition-colors"
          @click="toggleMenu"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504c.5.092.682-.217.682-.483c0-.237-.008-.868-.013-1.703c-2.782.605-3.369-1.343-3.369-1.343c-.454-1.158-1.11-1.466-1.11-1.466c-.908-.62.069-.608.069-.608c1.003.07 1.531 1.032 1.531 1.032c.892 1.53 2.341 1.088 2.91.832c.092-.647.35-1.088.636-1.338c-2.22-.253-4.555-1.113-4.555-4.951c0-1.093.39-1.988 1.029-2.688c-.103-.253-.446-1.272.098-2.65c0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027c.546 1.379.202 2.398.1 2.651c.64.7 1.028 1.595 1.028 2.688c0 3.848-2.339 4.695-4.566 4.943c.359.309.678.92.678 1.855c0 1.338-.012 2.419-.012 2.747c0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span class="text-white">GitHub</span>
        </a>

        <!-- Closed alpha / login button (mobile) -->
        <AlphaAccessButton
          showProfile
          class="flex items-center gap-2 p-2 rounded hover:bg-white/5 transition-colors justify-center text-white w-full"
          @click="toggleMenu"
        />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.nav-with-grid {
  background-image: linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
