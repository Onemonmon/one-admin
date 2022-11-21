import type { Menu } from "@/store/modules/permission";
import type { UserInfo } from "@/store/modules/user";
import { get, post } from "@/utils/http";

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  userId: string;
  username: string;
  token: string;
}

export const loginApi = (params: LoginParams) =>
  post<LoginResult>({
    url: "/user/login",
    data: params,
    isShowSuccessMessage: false,
  });

export const getUserInfoApi = () => get<UserInfo>({ url: "/user/getUserInfo" });

export const getMenuListApi = () => get<Menu[]>({ url: "/user/getMenuList" });
