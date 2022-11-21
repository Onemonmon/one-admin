import type { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { setupRouterGuard } from "./guard";
import { basicRoutes } from "./routes";

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes,
});

export const setupRouter = (app: App) => {
  app.use(router);
  setupRouterGuard(router);
};
