import {
  createApp as createClientApp,
  createSSRApp,
} from "vue";
import router from "./router";
import App from "./App.vue";
import { createHead } from "@vueuse/head";

export function createVueApp() {
  const appCreator = import.meta.env.SSR ? createSSRApp : createClientApp;
  const app = appCreator(App);

  // seo
  const head = createHead();
  head.push({
    titleTemplate: (title?: string) =>
      title ? `${title}` : "YAMP – Yet Another M* Platform",
    meta: [
      {
        key: "description",
        name: "description",
        content:
          "YAMP is a modern, secure and community-driven GTA V multiplayer platform focused on stability and performance.",
      },
      { key: "og:type", property: "og:type", content: "website" },
      { key: "og:site_name", property: "og:site_name", content: "YAMP" },
      {
        key: "og:title",
        property: "og:title",
        content: "YAMP – Yet Another M* Platform",
      },
      {
        key: "og:description",
        property: "og:description",
        content:
          "YAMP is a modern, secure and community-driven GTA V multiplayer platform focused on stability and performance.",
      },
      { key: "og:image", property: "og:image", content: "/og-default.jpg" },
      { name: "apple-mobile-web-app-title", content: "YAMP" },
    ],
    link: [
      { rel: "canonical", href: "https://yetanother.mp/" },
      { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  });

  app.use(router);
  app.use(head);

  return { app, router, head };
} 