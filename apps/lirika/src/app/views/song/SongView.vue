<script setup>
import { SongList } from "@lirika/ui";

import { ref, onMounted } from "vue";
import axios from "axios";

const songs = ref([]);
const loading = ref(true);
const error = ref(null);

const apiBaseUrl = import.meta.env.VITE_API_PROD_URL || "http://localhost:3000/api";

const fetchSongs = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/songs`);
    songs.value = response.data;
  } catch (err) {
    console.error("Error fetching songs:", err);
    error.value = "Failed to load songs. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchSongs);
</script>

<template>
  <div class="container mt-4">
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>
    <div v-else>
      <h2 class="text-center mb-4">🎵 Songs</h2>
      <SongList :songs="songs" />
    </div>
    <div class="text-center mt-4 d-flex justify-content-center gap-3">
      <router-link to="/songs/new" class="btn btn-primary">
        ➕ Add New Song
      </router-link>
    </div>
  </div>
</template>
