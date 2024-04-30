<template>
  <div>
    <ResponseStatus :error="error" />
    <section v-for="item in items" :key="item.id">
      <div class="container mx-auto p-4 pt-6" v-if="item?.title">
        <h1 class="text-3xl font-bold mb-4">
          {{ item.title }}
          <router-link :to="`/manage-record/${item.id}`">
            <span class="fa fa-edit text-lg text-blue-500 -mt-4"></span>
          </router-link>
        </h1>
        <h6 class="text-gray-600">{{ item.timestamp }}</h6>
        <p class="text-lg">{{ item.content }}</p>
        <p class="text-gray-600 mt-6">Tags: {{ item.tag }}</p>
      </div>
    </section>
    <LoadingIcon :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { ItemService } from "@/services/item_service";
import { ItemData } from "@/types/item";
import { handleError } from "@/utils";

import LoadingIcon from "@/components/LoadingIcon.vue";
import ResponseStatus from "@/components/ResponseStatus.vue";

export default defineComponent({
  name: "ManageRecord",
  components: {
    LoadingIcon,
    ResponseStatus,
  },
  setup() {
    const router = useRouter();
    const item_service = new ItemService();
    const items = ref<ItemData[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const page = ref(0);
    const lastItem = ref(false);

    onMounted(() => {
      window.addEventListener("scroll", onScroll);
      getItems();
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", onScroll);
    });

    const onScroll = async () => {
      if (lastItem.value) return;
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        await getItems();
      }
    };
    const getItems = async () => {
      if (loading.value) return;
      loading.value = true;
      try {
        page.value = page.value + 1;
        const response = await item_service.getItems(page.value);
        if (response.length === 0) {
          lastItem.value = true;
          return;
        }
        items.value.push(...response);
      } catch (err) {
        error.value = await handleError(err);
      } finally {
        loading.value = false;
      }
    };

    return {
      error,
      loading,
      items,
    };
  },
});
</script>
