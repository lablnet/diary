<template>
  <div>
    <ResponseStatus :error="error" />
    <section v-for="item in items" :key="item.id">
      <ItemDetail :item="item" :limitedContent="item.content.slice(0, 200)"  />
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
import ItemDetail from "@/components/ItemDetail.vue";

export default defineComponent({
  name: "ManageRecord",
  components: {
    LoadingIcon,
    ResponseStatus,
    ItemDetail,
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
