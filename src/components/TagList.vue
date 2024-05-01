<template>
  <section>
    <ul class="flex flex-wrap">
      <div
        v-for="t in tags"
        :key="t.id"
        class="w-fit flex items-start px-3 py-1 rounded-sm bg-gray-200 text-gray-700 mr-2 my-2 text-sm shadow-md"
      >
        <li class="w-fit text-center mt-1 mr-1 text-sm font-semibold">
          {{ t }}
        </li>
        <i
          v-if="showDelete"
          class="fa fa-close text-red-500 cursor-pointer"
          @click="removeTag(t)"
        ></i>
      </div>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TagList",
  props: {
    tags: {
      type: Array as () => Array<string>,
      required: true,
    },
    showDelete: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const removeTag = (tag: string) => {
      emit("remove", tag);
    };

    return {
      removeTag,
    };
  },
});
</script>
