import type { RouteRecordName, RouteRecordRaw } from "vue-router";

export const Layout = () => import("@/layout/Index.vue");

export const Exception = () => import("@/views/sys/exception/Index.vue");

export const RootRoute: RouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: "/dashboard",
};

export const LoginRoute: RouteRecordRaw = {
  path: "/login",
  name: "Login",
  meta: { title: "登录" },
  component: () => import("@/views/sys/login/Index.vue"),
};

export const PageNotFoundRoute: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: "PageNotFound",
  component: Layout,
  children: [
    {
      path: "/:path(.*)*",
      name: "PageNotFound",
      component: Exception,
    },
  ],
};

export const DashboardRoute: RouteRecordRaw = {
  path: "/dashboard",
  name: "Dashboard",
  meta: { title: "首页" },
  redirect: "/dashboard/workbench",
  component: Layout,
  children: [
    {
      path: "/dashboard/analysis",
      name: "Analysis",
      meta: { title: "数据分析" },
      component: () => import("@/views/dashboard/analysis/Index.vue"),
    },
    {
      path: "/dashboard/workbench",
      name: "Workbench",
      meta: { title: "工作台" },
      component: () => import("@/views/dashboard/workbench/Index.vue"),
    },
  ],
};

export const basicRoutes = [RootRoute, LoginRoute, DashboardRoute];

// 白名单（不需要登录）
export const whiteNameList: RouteRecordName[] = ["Login"];
