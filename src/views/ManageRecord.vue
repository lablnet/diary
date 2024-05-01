<template>
  <div>
    <div class="container mx-auto p-4 pt-6">
      <LoadingOverlayVue :loading="loading" />
      <h1 class="text-3xl font-bold mb-4">New Diary Entry</h1>
      <form role="form" @submit.prevent="createItem">
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
        <ResponseStatus :error="error || addError" :success="success" />
        <LoadingIcon :loading="addLoading" />
        <div class="mt-2 mb-2">
          <PrimaryButton
            :text="id ? 'Update' : 'Create'"
            @handleOnClick="createItem"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

import { useItem } from "@/composables/item";

import InputField from "@/components/InputField.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
import LoadingOverlayVue from "@/components/LoadingOverlay.vue";
import ResponseStatus from "@/components/ResponseStatus.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

import { Item } from "@/models/Item";
import { ItemService } from "@/services/item_service";
import { handleError } from "@/utils";
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
    LoadingOverlayVue,
  },
  setup() {
    const data = ref({
      title: "",
      tags: "",
      content: "",
    });
    const addLoading = ref(false);
    const addError = ref("");
    const success = ref("");
    const router = useRouter();
    // get id form the route params.
    const id = ref(router.currentRoute.value.params.id);

    const { item, loading, error, getItem } = useItem();

    onMounted(async () => {
      if (id.value != null) {
        await getItem(id.value as string);
      }
    });

    watch(item, (newVal) => {
      if (newVal) {
        data.value.title = newVal.title;
        data.value.tags = newVal.tag;
        data.value.content = newVal.content;
      }
    });

    const createItem = async () => {
      if (addLoading.value) return;
      addLoading.value = true;
      try {
        let _item = new Item({
          title: data.value.title,
          tag: data.value.tags,
          content: data.value.content,
          id: "",
          timestamp: item.value?.timestamp || null,
        });
        try {
          if (id.value) {
            _item.id = id.value as string;
            await new ItemService().updateItem(_item);
          } else {
            await new ItemService().createItem(_item);
          }
          success.value = "Item created successfully";
        } catch (e) {
          addError.value = await handleError(e);
        }
      } catch (e) {
        error.value = await handleError(e);
      } finally {
        addLoading.value = false;
      }
    };

    return {
      id,
      data,
      addLoading,
      error,
      addError,
      success,
      createItem,
      loading,
      item,
    };
  },
});
</script>
