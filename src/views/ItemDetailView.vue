<template>
  <div>
    <LoadingIcon :loading="loading" />
    <ResponseStatus :error="error" />
    <ItemDetail :item="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useItem } from "@/composables/item";

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
    // get id form the route params.
    const id = ref(router.currentRoute.value.params.id);
    const { item, loading, error, getItem } = useItem();

    onMounted(async () => {
      if (id.value != null) {
        await getItem(id.value as string);
      } else {
        router.push("/");
      }
    });

    return {
      id,
      error,
      loading,
      item,
    };
  },
});
</script>
