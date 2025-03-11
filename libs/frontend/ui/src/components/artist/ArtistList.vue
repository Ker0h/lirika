<template>
  <ul class="space-y-2">
    <li v-for="artist in artists" :key="artist.id" class="p-4 bg-gray-100 rounded-md">
      <h2 class="text-lg font-semibold">{{ artist.name }}</h2>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  artists: Array,
});
</script>