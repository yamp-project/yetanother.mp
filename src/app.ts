import { createSSRApp } from 'vue'
import { createSiteRouter } from './router'
import App from './App.vue'

// Each server request gets its own app and router; the browser hydrates the same tree.
export function createVueApp() {
    const app = createSSRApp(App)
    const router = createSiteRouter()
    app.use(router)
    return { app, router }
}
