/**
 * VITE 环境变量
 */
declare interface ViteEnv {
  /**
   * 端口号
   */
  VITE_PORT: number;
  /**
   * 公共基础路径
   */
  VITE_PUBLIC_PATH: string;
}

/**
 * import.meta.env
 */
declare interface ImportMetaEnv extends ViteEnv {}

/**
 * Record
 */
declare type Recordable<T = any> = Record<string, T>;
