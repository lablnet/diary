<template>
  <div class="rounded-md shadow-sm">
    <div>
      <label
        :for="id"
        class="block text-sm font-medium leading-5 text-text dark:text-text"
      >
        {{ label }}
        <span v-if="required" class="text-red-400">*</span>:
      </label>
      <div class="relative">
        <input
          :id="id"
          :name="name"
          :type="inputType"
          :autocomplete="autocomplete"
          :required="required"
          class="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:border-primary focus:outline-none focus:shadow-outline block mb-2 text-sm font-medium text-text dark:text-text dark:bg-background dark:border-secondary dark:placeholder-text dark:focus:ring-primary dark:focus:border-primary"
          :class="error ? 'border-red-500' : ''"
          :placeholder="placeholder"
          :value="modelValue"
          @input="updateValue"
          :disabled="disabled"
        />
        <i
          v-if="type === 'password'"
          class="fa cursor-pointer absolute right-4 bottom-3"
          :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
          @click="toggleShowPassword"
        ></i>
      </div>
      <span class="text-red-500 p-2 mt-3" v-if="error"> {{ error }} </span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";

export default defineComponent({
  name: "InputField",
  props: {
    id: {
      type: String,
      default: "text",
    },
    autocomplete: {
      type: String,
      default: "off",
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: null,
    },
    modelValue: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    error: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const showPassword = ref(false);

    const inputType = computed(() => {
      return props.type === "password" && !showPassword.value
        ? "password"
        : "text";
    });

    function updateValue(e: Event) {
      let target: HTMLInputElement | null = null;
      if (e.target instanceof HTMLInputElement) {
        target = e.target;
      }

      if (target) {
        emit("update:modelValue", target.value);
      }
    }

    function toggleShowPassword() {
      showPassword.value = !showPassword.value;
    }

    return {
      showPassword,
      inputType,
      updateValue,
      toggleShowPassword,
    };
  },
});
</script>
