<template>
  <div
    v-if="response"
    class="mt-2 mb-2 text-sm font-medium p-4 w-full"
    :class="alertClass"
  >
    {{ response }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "ResponseStatus",
  props: {
    error: { type: String, default: null },
    success: { type: String, default: null },
  },

  setup(props) {
    const response = computed(() => {
      return props.success || props.error || null;
    });

    const alertClass = computed(() => {
      if (props.success) {
        return "bg-green-600 text-white";
      }
      if (props.error) {
        return "bg-red-600 text-white";
      }
      return null;
    });

    return { response, alertClass };
  },
});
</script>
