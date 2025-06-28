import {
  createApp as createClientApp,
  createSSRApp,
  type App as VueApp,
} from "vue";
import router from "./router";
import App from "./App.vue";

export function createVueApp(): { app: VueApp; router: typeof router } {
  const appCreator = import.meta.env.SSR ? createSSRApp : createClientApp;
  const app = appCreator(App);

  app.use(router);

  return { app, router };
} 