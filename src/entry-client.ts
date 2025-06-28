import "./style.css";
import { createVueApp } from "./app";

const { app, router } = createVueApp();

router.isReady().then(() => {
  app.mount("#app");
}); 