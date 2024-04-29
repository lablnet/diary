<template>
  <section class="bg-background">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <slot name="header">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-text dark:text-text"
        >
          {{ title }}
        </a>
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-text md:text-2xl dark:text-text"
        >
          {{ subtitle }}
        </h1>
      </slot>

      <div
        class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-white dark:bg-background dark:border-secondary"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <slot></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AuthPage",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
  },
});
</script>
