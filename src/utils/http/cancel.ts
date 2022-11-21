import axios, { Axios, AxiosRequestConfig, Canceler } from "axios";

const pendingMap = new Map<string, Canceler>();

/**
 * 根据url、method、params、data生成key
 * @param config AxiosRequestConfig
 */
const genPendingKey = (config: AxiosRequestConfig): string => {
  const { url, method, params, data } = config;
  const paramsStr = params ? JSON.stringify(params) : "";
  const dataStr = data ? JSON.stringify(data) : "";
  return [url, method, paramsStr, dataStr].filter(Boolean).join("_");
};

/**
 * 添加请求
 * @param config AxiosRequestConfig
 */
export const addPending = (config: AxiosRequestConfig) => {
  const pendingKey = genPendingKey(config);
  config.cancelToken = new axios.CancelToken((cancel) => {
    if (!pendingMap.has(pendingKey)) {
      pendingMap.set(pendingKey, cancel);
    }
  });
};

/**
 * 移除请求
 * @param config AxiosRequestConfig
 */
export const removePending = (config: AxiosRequestConfig) => {
  const pendingKey = genPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancel = pendingMap.get(pendingKey);
    cancel!("请求重复");
    pendingMap.delete(pendingKey);
  }
};
