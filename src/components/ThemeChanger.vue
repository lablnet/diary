<template>
  <a href="#" @click.prevent="toggleTheme" class="py-1">
    <i
      v-if="currentTheme === 'light'"
      class="text-liText-ternary-dark hover:text-gray-400 dark:text-liText-ternary-light dark:hover:text-liBorder-primary-light w-5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-moon"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg
    ></i>
    <i v-else class="text-gray-200 hover:text-gray-50 w-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-sun"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg
    ></i>
  </a>
</template>

<script lang="ts">
import { ref, computed, watch, defineComponent } from "vue";

import { useThemeStore } from "@/store/ThemeStore";

export default defineComponent({
  name: "ThemeChanger",
  props: {
    theme: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const currentTheme = ref(props.theme);

    const toggleTheme = () => {
      const newTheme = currentTheme.value === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      useThemeStore().changeTheme(newTheme);
      currentTheme.value = newTheme;
    };

    // media query for dark theme
    const darkThemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    darkThemeMediaQuery.addEventListener("change", (e) => {
      const newColorScheme = e.matches ? "dark" : "light";
      currentTheme.value = newColorScheme;
      useThemeStore().changeTheme(newColorScheme);
    });

    return {
      currentTheme,
      toggleTheme,
    };
  },
});
</script>
