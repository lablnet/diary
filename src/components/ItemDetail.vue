<template>
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
</template>

<script lang="ts">
import {
    defineComponent
} from "vue";
import {
    ItemData
} from "@/types/item";

export default defineComponent({
    name: "ItemDetail",
    props: {
        item: {
            type: Object as () => ItemData,
            required: true,
        },
    },
});
</script>
