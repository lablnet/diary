<template>
  <div class="container mx-auto p-4 pt-6" v-if="item?.title">
    <h1 class="text-3xl font-bold mb-4">
      <router-link :to="`/item/${item.id}`">{{ item.title }}</router-link>
      <router-link class="ml-6" :to="`/manage-record/${item.id}`">
        <span class="fa fa-edit text-lg text-blue-500 -mt-4"></span>
      </router-link>
    </h1>
    <h6 class="text-gray-600">{{ item.timestamp }}</h6>
    <div class="prose">
      <MdPreview :editorId="editor_id" :modelValue="limitedContent ?? item.content" />
    </div>
    <p class="text-gray-600 mt-6"></p>
    <TagList :tags="item.tags" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ItemData } from '@/types/item'
import TagList from '@/components/TagList.vue'
import { MdPreview } from 'md-editor-v3'

export default defineComponent({
  name: 'ItemDetail',
  props: {
    item: {
      type: Object as () => ItemData,
      required: true
    },
    limitedContent: {
      type: String,
      default: null
    }
  },
  components: {
    MdPreview,
    TagList
  }
})
</script>
