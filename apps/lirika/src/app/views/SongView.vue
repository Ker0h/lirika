<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Songs</h1>
    <SongList :songs="songs" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { SongList } from '@lirika/ui';
import axios from "axios";

const songs = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/songs"); // Adjust API URL if needed
    songs.value = response.data;
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
});
</script>
