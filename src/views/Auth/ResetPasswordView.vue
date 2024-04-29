<template>
  <AuthPage
    title="Reset Password"
    subtitle=""
  >
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
    <div class="flex items-center justify-between">
      <LinkButton text="Go Back to login?" link="/" />
    </div>
    <LoadingIcon :loading="loading" />
    <ResponseStatus :error="error" :success="success" />
    <PrimaryButton
      text="Reset Password"
      :disable="loading || !email"
      @handleOnClick="reset"
    />
  </AuthPage>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useAuth } from "@/composables/auth";
import AuthPage from "@/layouts/AuthPage.vue";
import InputField from "@/components/InputField.vue";
import LinkButton from "@/components/LinkButton.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
import ResponseStatus from "@/components/ResponseStatus.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

export default defineComponent({
  name: "ResetPasswordView",
  components: {
    AuthPage,
    InputField,
    LinkButton,
    LoadingIcon,
    ResponseStatus,
    PrimaryButton,
  },
  setup() {
    const { resetPassword, error, success, loading } = useAuth();
    const email = ref("");

    const reset = () => {
      resetPassword(email.value);
    };

    return {
      email,
      reset,
      error,
      success,
      loading,
    };
  },
});
</script>
