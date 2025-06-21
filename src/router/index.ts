import { createRouter, createWebHistory } from "vue-router";

// Pages
import LandingPage from "../pages/LandingPage.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
