import axios, { AxiosResponse, CreateAxiosDefaults } from "axios";
import { message } from "ant-design-vue";
import { addPending, removePending } from "./cancel";
import { handleFailRetry } from "./retry";
import { baseURL } from "@/setting/project";
import { useUserStore } from "@/store/modules/user";
import type {
  BackendResponse,
  CreateRequest,
  CustomAxiosRequestConfig,
} from "./type";

const errorMap: Record<number, string> = {
  400: "错误的请求",
  401: "未授权，请重新登录",
  403: "拒绝访问",
  404: "资源不存在",
  405: "请求方法不允许",
  500: "服务端错误",
  502: "网络错误",
  503: "服务不可用",
  504: "网络超时",
};

export const createAxios = (config?: CreateAxiosDefaults) => {
  const service = axios.create({ baseURL, timeout: 10000, ...config });

  const handleAuthorization = (config: CustomAxiosRequestConfig) => {
    const userStore = useUserStore();
    const token = userStore.getToken;
    if (token) {
      config.headers = config.headers || {};
      config.headers.token = token;
    }
  };

  /**
   * 请求网络错误处理
   * @param status
   */
  const handleNetworkError = (status: number) => {
    message.error(errorMap[status] || "未知的错误");
    if (status === 401 || status === 403) {
      // userStore
    }
  };

  /**
   * 后端响应错误的处理
   * @param data
   */
  const handleGeneralError = (data: BackendResponse) => {
    data.message && message.error(data.message);
  };

  /**
   * 请求拦截器
   */
  service.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
      removePending(config);
      config.cancelRepeat && addPending(config);
      handleAuthorization(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**
   * 响应拦截器
   */
  service.interceptors.response.use(
    (response: AxiosResponse<BackendResponse>) => {
      const { config, status, data } = response;
      removePending(config);
      let isSucess = true;
      // 网络错误
      if (status !== 200) {
        handleNetworkError(status);
        isSucess = false;
      }
      // 后端返回的错误
      else if (data.code !== 200) {
        handleGeneralError(data);
        isSucess = false;
      }
      // Get请求失败，根据配置进行请求重试
      if (!isSucess) {
        if (config.method!.toUpperCase() === "GET") {
          return handleFailRetry(config, createRequest);
        }
        return Promise.reject(response);
      }
      // 处理成功
      const {
        isShowSuccessMessage,
        isReturnNativeResponse,
        isTransformResponse,
      } = config as CustomAxiosRequestConfig;
      isShowSuccessMessage && data.message && message.success(data.message);
      if (isTransformResponse) {
        return Promise.resolve(data.data);
      }
      if (isReturnNativeResponse) {
        return Promise.resolve(response);
      }
      return Promise.resolve(data);
    },
    (error) => {
      error.config && removePending(error.config);
      error.response && handleNetworkError(error.response.status);
    }
  );

  /**
   * 创建请求的工厂函数
   * @param method 请求类型
   * @returns get post form ...
   */
  const createRequest: CreateRequest = (method, customConfig) =>
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
    createRequest("get", config);
  const post = <T = any>(config: CustomAxiosRequestConfig): Promise<T> =>
    createRequest("post", config);

  return { get, post, service };
};

export const { get, post, service } = createAxios();
