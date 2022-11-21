import { createApp } from "vue";
import App from "@/App.vue";
import { setupRouter } from "@/router";
import { setupStore } from "./store";
import "ant-design-vue/dist/antd.less";

const bootstrap = () => {
  const app = createApp(App);
  setupStore(app);
  setupRouter(app);
  app.mount("#app");
};

bootstrap();
