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
