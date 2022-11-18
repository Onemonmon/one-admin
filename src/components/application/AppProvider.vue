<script lang="ts">
import { prefixCls } from "@/setting/design";
import { defineComponent } from "vue";
import { createAppProviderContext } from "./useAppProvider";

export default defineComponent({
  name: "AppProvider",
  props: { prefixCls: { type: String, default: prefixCls } },
  setup(props, { slots }) {
    createAppProviderContext({ prefixCls: props.prefixCls });
    return () => slots.default?.();
  },
});
</script>
