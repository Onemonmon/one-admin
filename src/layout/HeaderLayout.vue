<script lang="ts" setup>
import { ref } from "vue";
import {
  Avatar,
  LayoutHeader,
  Dropdown,
  Menu,
  MenuItem,
  MenuProps,
} from "ant-design-vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { usePrefixCls } from "@/hooks/web/usePrefixCls";
import { useUserStore } from "@/store/modules/user";
import { useAppStore } from "@/store/modules/app";

const { prefixCls } = usePrefixCls("header-layout");
const appStore = useAppStore();
const userStore = useUserStore();
const userInfo = userStore.getUserInfo;

const handleMenuFold = () => {
  appStore.setIsMenuFold(!appStore.isMenuFold);
};

const handleDropdownClcik: MenuProps["onClick"] = ({ key }) => {
  if (key === "logout") {
    userStore.logoutAction();
  }
};
</script>

<template>
  <LayoutHeader :class="prefixCls">
    <div :class="`${prefixCls}__left`">
      <div :class="`${prefixCls}__fold-icon`" @click="handleMenuFold">
        <MenuFoldOutlined v-show="!appStore.isMenuFold" />
        <MenuUnfoldOutlined v-show="appStore.isMenuFold" />
      </div>
    </div>
    <div :class="`${prefixCls}__right`">
      <Dropdown>
        <div :class="`${prefixCls}__user-dropdown`">
          <Avatar :src="userInfo.avatar" />
          <span :class="`${prefixCls}__user-dropdown--title`">{{
            userInfo.realName
          }}</span>
        </div>
        <template #overlay>
          <Menu @click="handleDropdownClcik">
            <MenuItem key="logout">
              <template #icon> <LogoutOutlined /> </template>
              退出系统
            </MenuItem>
          </Menu>
        </template>
      </Dropdown>
    </div>
  </LayoutHeader>
</template>

<style lang="less">
@prefixCls: ~"@{namespace}-header-layout";

.@{prefixCls} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0;
  background-color: #fff;
  line-height: 48px;
  &__left {
  }
  &__fold-icon {
    padding: 0 12px;
    cursor: pointer;
    &:hover {
      background-color: @btn-text-hover-bg;
    }
  }
  &__user-dropdown {
    display: flex;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;

    &--title {
      margin-left: 12px;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
