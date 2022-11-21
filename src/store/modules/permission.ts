import { getMenuListApi } from "@/api/sys/user";
import { router } from "@/router";
import {
  DashboardRoute,
  Exception,
  Layout,
  PageNotFoundRoute,
} from "@/router/routes";
import { defineStore } from "pinia";
import type { Component } from "vue";
import type { RouteMeta, RouteRecordRaw } from "vue-router";

export interface Menu {
  name: string;
  path: string;
  redirect?: string;
  meta?: RouteMeta;
  component: Component | string;
  children?: Menu[];
}

interface PermissionState {
  menuList: Menu[];
  isDynamicAddedRoute: boolean;
}

const dynamicPageModules = import.meta.glob("../../views/pages/**/Index.vue");

const dynamicImport = (component: string) => {
  const matched = Object.keys(dynamicPageModules).find((path) => {
    return path.replace("../../views", "") === component;
  });
  if (matched) {
    return dynamicPageModules[matched];
  }
  return Exception;
};

const transformMenuToRoute = (menuList: Menu[]) => {
  menuList.forEach((menu) => {
    const component = menu.component as string;
    if (component.toUpperCase() === "LAYOUT") {
      menu.component = Layout;
    } else {
      menu.component = dynamicImport(component);
    }
    menu.children && transformMenuToRoute(menu.children);
  });
  return menuList;
};

export const usePermissionStore = defineStore("permission", {
  state: (): PermissionState => ({
    menuList: [],
    isDynamicAddedRoute: false,
  }),
  getters: {
    getMenuList(): Menu[] {
      return this.menuList;
    },
  },
  actions: {
    setIsDynamicAddedRoute(isDynamicAddedRoute: boolean) {
      this.isDynamicAddedRoute = isDynamicAddedRoute;
    },
    /**
     * 构建路由
     */
    async buildRoutesAction() {
      const menuList = await getMenuListApi();
      const routeList = transformMenuToRoute(menuList);
      routeList.unshift(DashboardRoute as Menu);
      this.menuList = routeList;
      routeList.forEach((route) => router.addRoute(route as RouteRecordRaw));
      router.addRoute(PageNotFoundRoute);
      this.isDynamicAddedRoute = true;
    },
  },
});
