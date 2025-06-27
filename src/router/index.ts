import { createRouter, createWebHistory } from "vue-router";
// Optional: keep GSAP ScrollSmoother in sync when the route changes
import ScrollSmoother from "gsap/ScrollSmoother";

// Pages
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
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

// When the route changes, refresh ScrollSmoother so it recalculates heights
router.afterEach(() => {
  ScrollSmoother.get()?.refresh();
});

export default router;
