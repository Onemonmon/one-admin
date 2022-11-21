import type { AxiosRequestConfig } from "axios";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  /**
   * 取消重复请求（只发送最后一个）
   */
  cancelRepeat?: boolean;
  /**
   * 失败重试的次数
   */
  retryCount?: number;
  /**
   * 失败重试的延时
   */
  retryDelay?: number;
  /**
   * 是否直接返回res.data
   */
  isTransformResponse?: boolean;
  /**
   * 是否返回原响应体response
   */
  isReturnNativeResponse?: boolean;
  /**
   * 是否展示成功消息
   */
  isShowSuccessMessage?: boolean;
  [x: string]: any;
}

export interface BackendResponse {
  code: number;
  data: any;
  message?: string;
}

export type CreateRequest = (
  method: string,
  customConfig: CustomAxiosRequestConfig
) => Promise<any>;
