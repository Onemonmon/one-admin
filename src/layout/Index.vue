<script lang="ts" setup>
import { ref } from "vue";
import { Layout } from "ant-design-vue";
import HeaderLayout from "./HeaderLayout.vue";
import SiderLayout from "./SiderLayout.vue";
import ContentLayout from "./ContentLayout.vue";
</script>

<template>
  <Layout>
    <SiderLayout />
    <Layout>
      <HeaderLayout />
      <ContentLayout />
    </Layout>
  </Layout>
</template>

<style lang="less" scoped></style>
