import type { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
});

export const setupRouter = (app: App) => {
  app.use(router);
};
