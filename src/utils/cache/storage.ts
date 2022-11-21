export class WebStorage {
  /**
   * 使用的存储仓库
   */
  private storage: Storage;
  /**
   * key的前缀
   */
  private prefixKey: string | undefined;
  /**
   * 过期时间 秒
   */
  private expire: number | undefined;

  constructor(storage: Storage, prefixKey?: string, expire?: number) {
    this.storage = storage;
    this.prefixKey = prefixKey;
    this.expire = expire;
  }

  private getKey(key: string) {
    return `${this.prefixKey ? this.prefixKey + "_" : ""}${key}`.toUpperCase();
  }

  get(key: string, defaultValue: any = null) {
    const value = this.storage.getItem(this.getKey(key));
    if (!value) return defaultValue;
    const { data, expire } = JSON.parse(value);
    // 判断是否过期
    if (expire === null || expire >= Date.now()) {
      return data;
    }
    return defaultValue;
  }

  set(key: string, data: any, expire = this.expire) {
    const stringifyData = JSON.stringify({
      data,
      expire: expire ? Date.now() + expire * 1000 : null,
    });
    this.storage.setItem(this.getKey(key), stringifyData);
  }

  remove() {}
}
