<template>
  <div
    id="loader"
    class="fixed inset-0 min-h-screen flex items-center justify-center bg-white bg-opacity-95 z-10"
    v-if="loading"
  >
    <i class="fa fa-spinner fa-spin text-blue-500"> </i>
    Loading do not close the browser
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingOverlay",
  props: {
    loading: Boolean,
  },
});
</script>
