import { createVueApp } from './app'
import { updatePageMetadata } from './metadata'

const { app, router } = createVueApp()
router.afterEach((to) => updatePageMetadata(to.name === 'NotFound'))
router.isReady().then(() => app.mount('#app'))
