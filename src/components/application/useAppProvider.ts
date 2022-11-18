import { inject, InjectionKey, provide } from "vue";

export interface AppProviderContext {
  prefixCls: string;
}

const key: InjectionKey<{ prefixCls: string }> = Symbol();

export const createAppProviderContext = (context: AppProviderContext) => {
  provide(key, context);
};

export const useAppProviderContext = () => {
  return inject(key, {} as AppProviderContext);
};
