import { useAppProviderContext } from "@/components/application/useAppProvider";

/**
 * 添加样式前缀
 */
export const usePrefixCls = (className: string) => {
  const { prefixCls } = useAppProviderContext();
  return {
    prefixCls: `${prefixCls}-${className}`,
  };
};
