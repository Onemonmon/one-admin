<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Form, FormItem, Button, Input, InputPassword } from "ant-design-vue";
import { usePrefixCls } from "@/hooks/web/usePrefixCls";
import { useUserStore } from "@/store/modules/user";
import type { LoginParams } from "@/api/sys/user";

const { prefixCls } = usePrefixCls("login");
const userStore = useUserStore();

const formState = reactive<LoginParams>({ username: "", password: "" });
const submitLoading = ref(false);

const handleLogin = async (values: LoginParams) => {
  submitLoading.value = true;
  try {
    await userStore.loginAction(values);
  } finally {
    submitLoading.value = false;
  }
};
</script>

<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-form`">
      <h3 :class="`${prefixCls}-form__title`">登录</h3>
      <Form :model="formState" :onFinish="handleLogin">
        <FormItem
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <Input
            v-model:value="formState.username"
            placeholder="用户名"
            size="large"
          />
        </FormItem>
        <FormItem
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <InputPassword
            v-model:value="formState.password"
            placeholder="密码"
            size="large"
          />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            size="large"
            block
            html-type="submit"
            :loading="submitLoading"
          >
            登录
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<style lang="less">
@prefixCls: ~"@{namespace}-login";

.@{prefixCls} {
  &-form {
    width: 30%;
    margin: 60px;

    &__title {
      font-size: 20px;
      font-weight: bolder;
    }
  }
}
</style>
