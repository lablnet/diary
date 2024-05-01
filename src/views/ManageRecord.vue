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

        <TagList :tags="data.tags" @remove="removeTag" />
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
import TagList from "@/components/TagList.vue";

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
    TagList,
  },
  setup() {
    const data = ref({
      title: "" as string,
      tags: [] as string[],
      content: "" as string,
    });
    const tag = ref("");
    const addLoading = ref(false);
    const addError = ref("");
    const success = ref("");
    const router = useRouter();
    // get id form the route params.
    const id = ref(router.currentRoute.value.params.id);

    const { item, loading, error, getItem } = useItem();
    const localStorageKeys = ["title", "tags", "content"];

    onMounted(async () => {
      // Load values from localStorage, if available.
      // localStorageKeys.forEach((key: string | string[]) => {
      //   data.value[key as 'title' | 'tags' | 'content'] =
      //     localStorage.getItem(key) || ''
      // })

      if (id.value != null) {
        await getItem(id.value as string);
      }
    });

    watch(item, (newVal) => {
      if (newVal) {
        data.value.title = newVal.title;
        data.value.tags = newVal.tags;
        data.value.content = newVal.content;
      }
    });

    // // Watch for changes in the data object and update localStorage
    // localStorageKeys.forEach(key => {
    //   watch(
    //     () => data.value[key as 'title' | 'tags' | 'content'],
    //     newVal => {
    //       localStorage.setItem(key, newVal)
    //     }
    //   )
    // })

    const addTag = () => {
      // do not add tag if it is space, empty or already exists.
      if (tag.value.trim() === "" || tag.value.trim() === " ") return;
      // split it with whitespace or comma
      const tags = tag.value.split(/[\s,]+/);
      tags.forEach((tag) => {
        data.value.tags.push(tag);
      });
      // remove duplicate tags
      data.value.tags = data.value.tags.filter(
        (tag, index, self) => self.indexOf(tag) === index
      );
      tag.value = "";
      
    };

    const removeTag = (tag: string) => {
      data.value.tags = data.value.tags.filter((t) => t !== tag);
    };

    const createItem = async () => {
      if (addLoading.value) return;
      addLoading.value = true;
      try {
        let _item = new Item({
          title: data.value.title,
          tags: data.value.tags,
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
          success.value = "Item created successfully, redirecting...";
          // Remove values from localStorage
          localStorage.removeItem("title");
          localStorage.removeItem("tags");
          localStorage.removeItem("content");
          setTimeout(() => {
            router.push("/");
          }, 1000);
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
      tag,
      data,
      addLoading,
      error,
      addError,
      success,
      addTag,
      removeTag,
      createItem,
      loading,
      item,
    };
  },
});
</script>
