import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { handleError } from '@/utils'
import { Item } from '@/models/Item'
import { ItemData } from '@/types/item'
import { ItemService } from '@/services/item_service'

export function useItem () {
  const item = ref<ItemData | null>(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const success = ref<string | null>(null);
  const router = useRouter()
  const itemService = new ItemService();


  async function getItem (id: string) {
    try {
      loading.value = true
      const itemData = await itemService.getItem(id);
      if (!itemData) {
        router.push('/manage-record')
        return
      }
      item.value = itemData
    } catch (err) {
      error.value = await handleError(err);
    } finally {
      loading.value = false
    }
  }

  async function saveItem(data: ItemData) {
    try {
      loading.value = true;
      const _item = new Item({
        id: data.id,
        title: data.title,
        tags: data.tags,
        content: data.content,
        timestamp: data.timestamp
      })
      if (data.id) {
        await itemService.updateItem(_item);
        success.value = "Item updated successfully.";
      } else {
        await itemService.createItem(_item);
        success.value = "Item created successfully.";
      }
      removeLocalItem();
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      error.value = await handleError(err);
    } finally {
      loading.value = false;
    }
  }

  function removeLocalItem() {
    localStorage.removeItem("title");
    localStorage.removeItem("tags");
    localStorage.removeItem("content");
  }

  return {
    item,
    loading,
    error,
    success,
    getItem,
    saveItem,
    removeLocalItem
  }
}
