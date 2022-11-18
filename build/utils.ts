/**
 * loadEnv返回的环境变量都是string
 * 需要对其进行类型转换
 * @param env Recordable
 * @returns ViteEnv
 */
export const wrapperViteEnv = (env: Recordable): ViteEnv => {
  const result = {} as ViteEnv;
  for (const envName in env) {
    let realVal = env[envName];
    if (envName === "VITE_PORT") {
      realVal = Number(realVal);
    }
    result[envName] = realVal;
  }
  return result;
};
