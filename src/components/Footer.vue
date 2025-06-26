<template>
  <footer
    class="border-t border-white/10 py-6 px-4 md:px-8 bg-zinc-950 text-white z-20 relative"
  >
    <div
      class="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center"
    >
      <div class="flex items-center gap-2">
        <span class="font-semibold">© {{ new Date().getFullYear() }} YAMP</span>
      </div>
      <div class="flex items-center gap-4">
        <RouterLink to="/" class="hover:text-purple-400 transition-colors"
          >Home</RouterLink
        >
        <RouterLink
          to="/terms-of-use"
          class="hover:text-purple-400 transition-colors"
          >Terms of Use</RouterLink
        >
        <a
          href="https://github.com/yamp-project"
          target="_blank"
          rel="noopener"
          class="hover:text-purple-400 transition-colors"
          >GitHub</a
        >
      </div>
    </div>
  </footer>
</template>
