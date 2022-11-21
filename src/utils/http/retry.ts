import type { CreateRequest, CustomAxiosRequestConfig } from "./type";

/**
 * 请求重试
 * @param config
 * @param createRequest
 */
export const handleFailRetry = (
  config: CustomAxiosRequestConfig,
  createRequest: CreateRequest
) => {
  const { method, retryCount, retryDelay } = config;
  // 记录当前重试的次数
  config.__retryCount = config.__retryCount || 0;
  config.__retryCount += 1;
  if (config.__retryCount > retryCount!) {
    return Promise.reject();
  }
  return new Promise((resolve) => setTimeout(resolve, retryDelay)).then(() =>
    createRequest(method!, config)
  );
};
