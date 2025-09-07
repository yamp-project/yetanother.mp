import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import TermsOfUse from "../pages/TermsOfUse.vue";
import NotFound from "../pages/NotFound.vue";

export const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
  },
  {
    path: "/terms-of-use",
    name: "TermsOfUse",
    component: TermsOfUse,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

// Detect whether we are running in a browser (window available). Vite sets `import.meta.env.SSR` during
// its own server build, but external runtimes (e.g., Bun/Node scripts) won't.
const isBrowser = typeof window !== "undefined";

const router = createRouter({
  history: isBrowser ? createWebHistory() : createMemoryHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (_to.hash) return { el: _to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});

export default router;