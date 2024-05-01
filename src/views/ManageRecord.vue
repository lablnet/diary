<template>
  <div>
    <div class="container mx-auto p-4 pt-6">
      <LoadingOverlayVue :loading="loading" />
      <h1 class="text-3xl font-bold mb-4">New Diary Entry</h1>
      <form role="form" @submit.prevent="createItem" @keydown.enter.prevent="">
        <InputField
          v-model="data.title"
          type="text"
          placeholder="Title"
          label="Title"
        />

        <TagList :tags="data.tags" :showDelete="true" @remove="removeTag" />
        <InputField
          v-model="tag"
          type="text"
          placeholder="Tags"
          @keydown.enter="addTag"
          label="Tags"
        />
        <div class="rounded-md shadow-sm">
          <label
            class="block text-sm font-medium leading-5 text-text dark:text-text"
          >
            Content :
          </label>
          <MdEditor
            v-model="data.content"
            :noUploadImg="false"
            :readOnly="false"
            :language="'en-US'"
          />
        </div>
        {{error}}
        <ResponseStatus :error="error" :success="success" />
        <div class="mt-2 mb-2">
          <PrimaryButton
            :text="id ? 'Update' : 'Create'"
            @handleOnClick="saveItem(data)"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

import { useItem } from "@/composables/item";
import { useTags } from "@/composables/tags";

import InputField from "@/components/InputField.vue";
import LoadingOverlayVue from "@/components/LoadingOverlay.vue";
import ResponseStatus from "@/components/ResponseStatus.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import TagList from "@/components/TagList.vue";

import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

export default defineComponent({
  name: "ManageRecord",
  components: {
    InputField,
    MdEditor,
    PrimaryButton,
    ResponseStatus,
    LoadingOverlayVue,
    TagList,
  },

  setup() {
    const data = reactive({
      title: localStorage.getItem("title") || "",
      tags: JSON.parse(localStorage.getItem("tags") || "[]"),
      content: localStorage.getItem("content") || "",
      id: "",
      timestamp: null as Date | string | null,
    });
    const { tag, addTag, removeTag } = useTags(data);
    const {
      item,
      loading,
      error,
      success,
      getItem,
      saveItem,
      removeLocalItem,
    } = useItem();
    const router = useRouter();
    // get id form the route params.
    const id = ref(router.currentRoute.value.params.id);

    onMounted(async () => {
      if (id.value) {
        await getItem(id.value as string);
      }
    });

    watch(
      data,
      (newVal) => {
        // Sync with local storage when data changes
        localStorage.setItem("title", newVal.title);
        localStorage.setItem("tags", JSON.stringify(newVal.tags));
        localStorage.setItem("content", newVal.content);
      },
      { deep: true }
    );

    watch(item, (newVal) => {
      if (newVal) {
        data.title = newVal.title;
        data.tags = newVal.tags;
        data.content = newVal.content;
        data.id = newVal.id;
        data.timestamp = newVal.timestamp;

        // Clear local storage when item is successfully loaded
        removeLocalItem();
      }
    });

    return {
      id,
      tag,
      data,
      error,
      success,
      addTag,
      removeTag,
      saveItem,
      loading,
      item,
    };
  },
});
</script>
