import { ref, watch } from 'vue';

export function useTags(data: any) {
  const tag = ref("");

  const addTag = () => {
    if (tag.value.trim() === "" || tag.value.trim() === " ") return;
    const tags = tag.value.split(/[\s,]+/);
    tags.forEach((t: string) => {
      if (!data.tags.includes(t)) {
        data.tags.push(t);
      }
    });
    tag.value = "";
    // localStorage.setItem("tags", JSON.stringify(data.value.tags));
  };

  const removeTag = (tagToRemove: string) => {
    data.tags = data.tags.filter((t: string) => t !== tagToRemove);
    // localStorage.setItem("tags", JSON.stringify(data.value.tags));
  };

  // Initialization and local storage sync
//   watch(data.value.tags, (newTags: string) => {
//     localStorage.setItem("tags", JSON.stringify(newTags));
//   }, { deep: true });

  return { tag, addTag, removeTag };
}
