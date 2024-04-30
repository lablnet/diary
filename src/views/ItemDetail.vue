<template>
  <div>
    <LoadingIcon :loading="loading" />
    <ResponseStatus :error="error" />
    <div class="container mx-auto p-4 pt-6" v-if="item?.title">
      <h1 class="text-3xl font-bold mb-4">{{ item.title }} 
        <router-link :to="`/manage-record/${item.id}`">
          <span class="fa fa-edit text-lg text-blue-500 -mt-4"></span>
        </router-link>
      </h1>
      <h6 class="text-gray-600">{{ item.timestamp }}</h6>
      <p class="text-lg">{{ item.content }}</p>
      <p class="text-gray-600 mt-6">Tags: {{ item.tag}}</p>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useItem } from "@/composables/item";

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
