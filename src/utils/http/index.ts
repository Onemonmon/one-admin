import axios, { CreateAxiosDefaults } from "axios";
import type { CustomAxiosRequestConfig } from "./type";

export const createAxios = (config?: CreateAxiosDefaults) => {
  const service = axios.create({
    baseURL: "/onemonmon",
    timeout: 10000,
    ...config,
  });

  service.interceptors.request.use(
    (config) => {
      console.log(config);

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {}
  );

  const createMethod =
    (method: string) =>
    (customConfig: CustomAxiosRequestConfig): Promise<any> =>
      service({
        method,
        cancelRepeat: true,
        retryCount: 0,
        retryDelay: 1000,
        isTransformResponse: true,
        isReturnNativeResponse: false,
        isShowSuccessMessage: true,
        ...customConfig,
      } as CustomAxiosRequestConfig);

  const get = <T = any>(config: CustomAxiosRequestConfig): Promise<T> =>
    createMethod("get")(config);
  const post = <T = any>(config: CustomAxiosRequestConfig): Promise<T> =>
    createMethod("post")(config);

  return { get, post, service };
};

export const { get, post, service } = createAxios();
