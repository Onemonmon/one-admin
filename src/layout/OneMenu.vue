<script lang="ts" setup>
import { usePermissionStore } from "@/store/modules/permission";
import { ref } from "vue";
import { Menu, MenuItem, MenuProps } from "ant-design-vue";
import { AccountBookOutlined, CalculatorFilled } from "@ant-design/icons-vue";
import OneSubMenu from "./OneSubMenu.vue";
import { useRouter } from "vue-router";
import { useRouteChange } from "@/hooks/web/useRouteChange";
import { useAppStore } from "@/store/modules/app";

const appStore = useAppStore();
const permissionStore = usePermissionStore();
const router = useRouter();

const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
  router.push({ name: key as string });
};

const handleMenuOpenChange: MenuProps["onOpenChange"] = (keys) => {
  if (appStore.isMenuFold) return;
  const openLen = keys.length;
  openLen > 1 && (keys = keys.slice(openLen - 1));
  openKeys.value = keys as string[];
};

useRouteChange((route) => {
  const { name, matched } = route;
  selectedKeys.value = [name as string];
  if (!appStore.isMenuFold) {
    openKeys.value = [matched[0].name as string];
  }
});
</script>

<template>
  <Menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    mode="inline"
    theme="dark"
    @click="handleMenuClick"
    @openChange="handleMenuOpenChange"
  >
    <template v-for="item in permissionStore.menuList" :key="item.name">
      <MenuItem :key="item.name" v-if="!item.children">
        <template #icon><AccountBookOutlined /></template>
        {{ item.meta?.title }}
      </MenuItem>
      <OneSubMenu :menu="item" v-else />
    </template>
  </Menu>
</template>

<style lang="less"></style>
