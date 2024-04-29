<template>
  <div :class="divClass">
    <button
      @click="handleClick"
      :disabled="disable"
      :class="[
        disable
          ? `${_class} opacity-25 cursor-not-allowed`
          : `${_class} cursor-pointer`,
      ]"
    >
      {{ text }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PrimaryButton",
  props: {
    divClass: {
      type: String,
      default: "",
    },
    _class: {
      type: String,
      default:
        "w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
    },
    text: {
      type: String,
      default: "Button",
    },
    link: {
      type: String,
      default: null,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const handleClick = () => {
      emit("handleOnClick");
    };

    return {
      handleClick,
    };
  },
});
</script>
