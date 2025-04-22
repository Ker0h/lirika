<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  searchKeys: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Search...",
  },
});

const emit = defineEmits(["filtered"]);
const query = ref("");

const normalize = (val) => (val || "").toString().toLowerCase();
const deepGet = (obj, path) => path.split(".").reduce((acc, part) => acc?.[part], obj);

const filteredList = computed(() => {
  const q = normalize(query.value);
  if (!q) return props.list;

  return props.list.filter((item) =>
    props.searchKeys.some((key) =>
      normalize(deepGet(item, key)).includes(q)
    )
  );
});

watch([filteredList, query], () => {
  emit("filtered", filteredList.value);
});
</script>

<template>
  <div class="search-bar input-group mb-4">
    <span class="input-group-text bg-white border-end-0">
      <i class="bi bi-search"></i>
    </span>
    <input v-model="query" type="text" class="form-control border-start-0" :placeholder="placeholder" />
  </div>
</template>

<style scoped>
.search-bar input {
  border-radius: 0 0.375rem 0.375rem 0;
  box-shadow: none;
}

.input-group-text {
  border-radius: 0.375rem 0 0 0.375rem;
}
</style>
