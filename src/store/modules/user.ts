import { notification, Modal } from "ant-design-vue";
import { getUserInfoApi, loginApi, LoginParams } from "@/api/sys/user";
import { router } from "@/router";
import { baseHomePath } from "@/setting/project";
import { ss } from "@/utils/cache";
import { defineStore } from "pinia";
import { usePermissionStore } from "./permission";

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
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    userInfo: null,
    token: "",
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || ss.get("USER_INFO");
    },
    getToken(): string {
      return this.token || ss.get("TOKEN");
    },
  },
  actions: {
    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo;
      ss.set("USER_INFO", userInfo);
    },
    setToken(token: string) {
      this.token = token;
      ss.set("TOKEN", token);
    },
    /**
     * 登录
     */
    async loginAction(params: LoginParams) {
      const res = await loginApi(params);
      this.setToken(res.token);
      // 获取用户信息
      const userInfo = await getUserInfoApi();
      this.setUserInfo(userInfo);
      // 构建路由
      const permissionStore = usePermissionStore();
      await permissionStore.buildRoutesAction();
      await router.replace(this.getUserInfo.homePath || baseHomePath);
      notification.success({
        message: "登录成功",
        description: `欢迎回来：${userInfo.realName}`,
      });
    },
    /**
     *
     */
    async logoutAction() {
      Modal.confirm({
        title: "温馨提示",
        content: "是否确认退出系统？",
        onOk: () => {
          this.setToken("");
          this.setUserInfo(null);
          router.push("/login");
        },
      });
    },
  },
});
