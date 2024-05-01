import { ref, watch } from 'vue';

export default function useTags(data) {
  const tag = ref("");

  const addTag = () => {
    if (tag.value.trim() === "" || tag.value.trim() === " ") return;
    const tags = tag.value.split(/[\s,]+/);
    tags.forEach(t => {
      if (!data.value.tags.includes(t)) {
        data.value.tags.push(t);
      }
    });
    tag.value = "";
    localStorage.setItem("tags", JSON.stringify(data.value.tags));
  };

  const removeTag = (tagToRemove) => {
    data.value.tags = data.value.tags.filter(t => t !== tagToRemove);
    localStorage.setItem("tags", JSON.stringify(data.value.tags));
  };

  // Initialization and local storage sync
  watch(data.value.tags, (newTags) => {
    localStorage.setItem("tags", JSON.stringify(newTags));
  }, { deep: true });

  return { tag, addTag, removeTag };
}
