import { defineStore } from "pinia";

interface AppState {
  isMenuFold: boolean;
}
export const useAppStore = defineStore("app", {
  state: () => ({
    isMenuFold: false,
  }),
  getters: {},
  actions: {
    setIsMenuFold(fold: boolean) {
      this.isMenuFold = fold;
    },
  },
});
