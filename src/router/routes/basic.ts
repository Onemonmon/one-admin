import type { RouteRecordRaw } from "vue-router";

export const LoginRoute: RouteRecordRaw = {
  path: "/login",
  name: "Login",
  meta: { title: "登录" },
  component: () => import("@/views/sys/login/Login.vue"),
};
