<template>
  <div>
    <div class="container mx-auto p-4 pt-6">
      <h1 class="text-3xl font-bold mb-4">New Diary Entry</h1>
      <form role="form">
        <InputField
          v-model="data.title"
          type="text"
          placeholder="Title"
          label="Title"
        />
        <InputField
          v-model="data.tags"
          type="text"
          placeholder="Tags"
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
        <ResponseStatus :error="error" :success="success" />
        <LoadingIcon :loading="loading" />
        <div class="mt-2 mb-2">
          <PrimaryButton text="Create" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InputField from "@/components/InputField.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
import ResponseStatus from "@/components/ResponseStatus.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

import { Item } from "@/models/Item";
import { ItemService } from "@/services/item_service";
import { handleError } from '@/utils'
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

export default defineComponent({
  name: "ManageRecord",
  components: {
    InputField,
    MdEditor,
    PrimaryButton,
    LoadingIcon,
    ResponseStatus,
  },
  setup() {
    const data = ref({
      title: "",
      tags: "",
      content: "",
    });
    const loading = ref(false);
    const error = ref("");
    const success = ref("");

    const createItem = async () => {
      loading.value = true;
      try {
        let item = new Item({
          title: data.value.title,
          tag: data.value.tags,
          content: data.value.content,
          id: "",
          timestamp: null,
        });
        await new ItemService().createItem(item);
        success.value = "Item created successfully";
      } catch (e) {
        error.value = await handleError(e)
      } finally {
        loading.value = false;
      }
    };

    return {
      data,
    };
  },
});
</script>
