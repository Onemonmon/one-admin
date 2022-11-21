import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    /**
     * 中文名
     */
    title: string;
    /**
     * 是否已加载过
     */
    loaded?: boolean;
  }
}
