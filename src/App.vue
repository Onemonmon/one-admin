<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
import zhCn from "ant-design-vue/es/locale-provider/zh_CN";
import AppProvider from "./components/application/AppProvider.vue";
</script>

<template>
  <ConfigProvider :locale="zhCn">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>
