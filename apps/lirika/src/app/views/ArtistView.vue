<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Artists</h1>
    <ArtistList :artists="artists" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ArtistList } from '@lirika/ui';
import axios from "axios";

const artists = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/artists"); // Adjust API URL if needed
    artists.value = response.data;
  } catch (error) {
    console.error("Error fetching artists:", error);
  }
});
</script>