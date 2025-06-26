import { createRouter, createWebHistory } from "vue-router";

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

export default router;
