<script lang="ts" setup>
import { ref } from "vue";
import { LayoutContent } from "ant-design-vue";
import { usePrefixCls } from "@/hooks/web/usePrefixCls";
import { useUserStore } from "@/store/modules/user";

const { prefixCls } = usePrefixCls("content-layout");
const userStore = useUserStore();
</script>

<template>
  <LayoutContent :class="prefixCls">
    <RouterView />
  </LayoutContent>
</template>

<style lang="less"></style>
