<script lang="ts">
export default { name: "OneSubMenu" };
</script>

<script lang="ts" setup>
import { PropType, ref } from "vue";
import { SubMenu, MenuItem } from "ant-design-vue";
import { AccountBookOutlined, CalculatorFilled } from "@ant-design/icons-vue";
import type { Menu } from "@/store/modules/permission";

defineProps({
  menu: { type: Object as PropType<Menu>, required: true },
});
</script>

<template>
  <SubMenu :key="menu.name">
    <template #icon><AccountBookOutlined /></template>
    <template #title>{{ menu.meta?.title }}</template>
    <template v-for="item in menu.children" :key="item.name">
      <OneSubMenu :menu="item" v-if="item.children" />
      <MenuItem :key="item.name" v-else>
        <template #icon><CalculatorFilled /></template>
        {{ item.meta?.title }}
      </MenuItem>
    </template>
  </SubMenu>
</template>

<style lang="less"></style>
