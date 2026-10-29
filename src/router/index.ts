import { createRouter, createWebHistory, createMemoryHistory, START_LOCATION } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import NotFound from '../pages/NotFound.vue'

export function createSiteRouter() {
    return createRouter({
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes: [
            { path: '/', name: 'Landing', component: LandingPage },
            { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
        ],
        scrollBehavior(to, from, savedPosition) {
            if (from === START_LOCATION) return { top: 0 }
            if (savedPosition) return savedPosition
            if (to.hash === '#home') return { el: '#home' }
            return { top: 0 }
        },
    })
}
