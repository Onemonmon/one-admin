<script lang="ts" setup>
import { ref } from "vue";
import { LayoutSider } from "ant-design-vue";
import OneMenu from "./OneMenu.vue";
import { usePrefixCls } from "@/hooks/web/usePrefixCls";
import { useUserStore } from "@/store/modules/user";
import { useAppStore } from "@/store/modules/app";

const { prefixCls } = usePrefixCls("sider-layout");
const appStore = useAppStore();
const userStore = useUserStore();
</script>

<template>
  <LayoutSider :class="prefixCls" :collapsed="appStore.isMenuFold">
    <div :class="`${prefixCls}__logo`">
      <img src="../assets/logo.png" />
      <span :class="`${prefixCls}__appname`" v-show="!appStore.isMenuFold">
        One Admin
      </span>
    </div>
    <OneMenu />
  </LayoutSider>
</template>

<style lang="less">
@prefixCls: ~"@{namespace}-sider-layout";

.@{prefixCls} {
  height: 100vh;

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    font-size: 20px;
    color: #fff;

    img {
      width: 28px;
      height: 28px;
    }
  }
  &__appname {
    margin-left: 8px;
  }
}
</style>
