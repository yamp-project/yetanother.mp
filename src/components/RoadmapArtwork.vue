<script setup lang="ts">
    import MemoryScene from './MemoryScene.vue'
</script>

<template>
    <div
        class="roadmap-art"
        aria-hidden="true"
    >
        <MemoryScene />
    </div>
</template>

<style scoped>
    .roadmap-art {
        position: relative;
        min-width: 0;
        min-height: 0;
        overflow: hidden;
        mask-image: linear-gradient(90deg, transparent, #000 9%, #000 88%, transparent);
    }
</style>
