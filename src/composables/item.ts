import { ref } from 'vue'
import { handleError } from '@/utils'
import { ItemData } from '@/types/item'
import { ItemService } from '@/services/item_service'

export function useItem () {
  const item = ref<ItemData | null>(null)
  const loading = ref<boolean>(false)

  async function getItem (id: string) {
    try {
      loading.value = true
      const itemData = await (new ItemService()).getItem(id)
      item.value = itemData
    } catch (error) {
      handleError(error)
    } finally {
      loading.value = false
    }
  }

  return {
    item,
    loading,
    getItem
  }
}
