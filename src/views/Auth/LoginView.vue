<template>
  <AuthPage title="Login to get started." subtitle="">
    <div>
      <InputField
        id="email"
        name="email"
        type="email"
        autocomplete="off"
        placeholder="Email"
        v-model="email"
        :required="true"
        label="Email"
        :disabled="false"
      />
    </div>
    <div>
      <InputField
        id="password"
        name="password"
        type="password"
        autocomplete="off"
        placeholder="Password"
        v-model="password"
        :required="true"
        label="Password"
        :disabled="false"
      />
    </div>
    <div class="flex items-center justify-between">
      <LinkButton text="Forgot password" link="/auth/forgot-password" />
    </div>
    <LoadingIcon :loading="loading" />
    <ResponseStatus :error="error" :success="success" />
    <PrimaryButton
      text="login"
      :disable="loading || !email || !password"
      @handleOnClick="login(email, password)"
    />
    <hr />
    <div class="text-center text-xs">Or continue with</div>
    <div class="flex items-center justify-center">
      <img
        @click="loginWithGoogle"
        class="h-8 w-8 cursor-pointer"
        src="../../assets/icons/google.svg"
      />
    </div>

    <LoadingOverlay :loading="externalAuthLoading" />
  </AuthPage>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAuth } from "@/composables/auth";
import AuthPage from "@/layouts/AuthPage.vue";
import InputField from "@/components/InputField.vue";
import LinkButton from "@/components/LinkButton.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
import ResponseStatus from "@/components/ResponseStatus.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";

export default defineComponent({
  name: "LoginView",
  components: {
    AuthPage,
    InputField,
    LinkButton,
    LoadingIcon,
    ResponseStatus,
    PrimaryButton,
    LoadingOverlay,
  },
  setup() {
    const { error, success, loading, externalAuthLoading,  login, loginWithGoogle } = useAuth();
    const email = ref("");
    const password = ref("");

    return {
      email,
      password,
      login,
      loginWithGoogle,
      error,
      success,
      loading,
      externalAuthLoading,
    };
  },
});
</script>
