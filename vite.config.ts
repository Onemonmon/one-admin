import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { wrapperViteEnv } from "./build/utils";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 根目录
  const rootDir = process.cwd();
  // 获取环境变量
  const { VITE_PORT, VITE_PUBLIC_PATH } = wrapperViteEnv(
    loadEnv(mode, rootDir)
  );
  return {
    root: rootDir,
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "#": resolve(__dirname, "types"),
      },
    },
    server: {
      port: VITE_PORT,
      open: true,
      proxy: {
        "/onemonmon": {
          target: "http://localhost:4000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/onemonmon/, ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "@/design/var/index.less";`,
        },
      },
    },
    plugins: [vue()],
  };
});
