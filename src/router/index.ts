import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from "vue-router";
import ScrollSmoother from "gsap/ScrollSmoother";
import LandingPage from "../pages/LandingPage.vue";
import TermsOfUse from "../pages/TermsOfUse.vue";

const routes = [
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
];

const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

// we need to refresh ScrollSmoother to recalculate heights
router.afterEach(() => {
  if (!import.meta.env.SSR) {
    ScrollSmoother.get()?.refresh();
  }
});

export default router;
