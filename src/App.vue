<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import SiteHeader from './components/SiteHeader.vue'
    import SiteFooter from './components/SiteFooter.vue'
    import CustomCursor from './components/CustomCursor.vue'

    const route = useRoute()
</script>

<template>
    <SiteHeader :key="`header-${route.path}`" />
    <RouterView />
    <SiteFooter :key="`footer-${route.path}`" />
    <CustomCursor />
</template>
