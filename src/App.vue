<template>
  <main v-if="$route.path.includes('/auth')">
    <router-view />
  </main>
  <main v-else>
    <nav class="flex justify-between items-center p-4 bg-blue-500 text-white">
      <div class="flex items-center font-bold text-lg">
        <img src="@/assets/logo.png" class="w-12 h-12 mr-2" />
        <router-link to="/">Diary</router-link>
      </div>
      <div>
        <router-link class="bg-green-500 px-2 py-1 rounded" to="/manage-record"
          >New</router-link
        >
        <router-link class="ml-4" to="/logout">Logout</router-link>
      </div>
    </nav>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const route = useRoute();

    watch(
      () => route.meta.title,
      (title) => {
        if (typeof title === "string") {
          document.title = title + " - Diary";
        } else {
          document.title = "Diary";
        }
      }
    );
  },
});
</script>
