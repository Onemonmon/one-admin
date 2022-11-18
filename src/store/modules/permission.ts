import { defineStore } from "pinia";

export interface Menu {
  name: string;
  path: string;
  redirect?: string;
  meta?: RouteMeta;
  children?: Menu[];
}

interface PermissionState {
  menuList: Menu[];
}

export const usePermissionStore = defineStore("permission", {
  state: (): PermissionState => ({
    menuList: [],
  }),
  getters: {},
  actions: {},
});
