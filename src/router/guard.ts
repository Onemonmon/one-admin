import { usePermissionStore } from "@/store/modules/permission";
import { useUserStore } from "@/store/modules/user";
import { Router, RouteRecordName } from "vue-router";
import { whiteNameList } from "./routes";

const loadedPageMap = new Map<RouteRecordName, boolean>();

/**
 * 路由变化守卫
 */
const createPageGuard = (router: Router) => {
  router.beforeEach((to) => {
    to.meta.loaded = !!loadedPageMap.get(to.name!);
  });
  router.afterEach((to) => {
    loadedPageMap.set(to.name!, true);
  });
};

/**
 * 权限守卫
 * @param router
 */
const createPermissionGuard = (router: Router) => {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  router.beforeEach(async (to, from, next) => {
    const token = userStore.getToken;
    if (!token) {
      // 白名单不需要登录
      if (whiteNameList.includes(to.name!)) {
        return next();
      }
      // 否则跳转登录页
      return next({ path: "/login", replace: true });
    } else if (to.name === "Login") {
      // 已登录就不能跳转到登录页
      return next({ path: from.path, replace: true });
    }
    // 未添加路由则添加
    if (!permissionStore.isDynamicAddedRoute) {
      permissionStore.setIsDynamicAddedRoute(true);
      await permissionStore.buildRoutesAction();
      // 动态添加路由后，需要手动跳转一次
      return next({ path: to.path });
    }
    next();
  });
};

export const setupRouterGuard = (router: Router) => {
  createPageGuard(router);
  createPermissionGuard(router);
};
