import { loginApi, LoginParams } from "@/api/sys/user";
import { defineStore } from "pinia";

export interface UserInfo {
  username: string;
  realName: string;
  avatar: string;
  token: string;
  homePath: string;
  roleList: string[];
}

interface UserState {
  userInfo: UserInfo | null;
  token: string;
  homePath: string;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    userInfo: null,
    token: "",
    homePath: "",
  }),
  getters: {},
  actions: {
    /**
     * 登录
     */
    async loginAction(params: LoginParams) {
      const res = await loginApi(params);
    },
    /**
     *
     */
    async afterLoginAction() {},
    /**
     *
     */
    async logoutAction() {},
    /**
     * 获取用户信息
     */
    async getUserInfoAction() {},
  },
});
