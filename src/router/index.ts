import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import NotFound from '../pages/NotFound.vue'

export function createSiteRouter() {
    return createRouter({
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes: [
            { path: '/', name: 'Landing', component: LandingPage },
            { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
        ],
        scrollBehavior(to, _from, savedPosition) {
            if (savedPosition) return savedPosition
            if (to.hash === '#home') return { el: '#home' }
            return { top: 0 }
        },
    })
}
