<template>
  <ul class="space-y-2">
    <li v-for="song in songs" :key="song.id" class="p-4 bg-gray-100 rounded-md">
      <h2 class="text-lg font-semibold">{{ song.title }}</h2>
      <p class="text-gray-700">Artist: {{ song.artist.name }}</p>
      <p class="text-gray-700">Album: {{ song.album.title }}</p>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  songs: Array,
});
</script>
