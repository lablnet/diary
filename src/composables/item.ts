import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { handleError } from '@/utils'
import { ItemData } from '@/types/item'
import { ItemService } from '@/services/item_service'

export function useItem () {
  const item = ref<ItemData | null>(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const router = useRouter()

  async function getItem (id: string) {
    try {
      loading.value = true
      const itemData = await (new ItemService()).getItem(id)
      console.log("itemData", itemData)
        if (!itemData) {
            router.push('/manage-record')
            return
        }
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
    error,
    getItem
  }
}
