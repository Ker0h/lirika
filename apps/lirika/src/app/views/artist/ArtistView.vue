<script setup>
import { ArtistList } from '@lirika/ui';

import { ref, onMounted } from "vue";
import axios from "axios";

const artists = ref([]);
const loading = ref(true);
const error = ref(null);

const apiBaseUrl = import.meta.env.PROD
  ? import.meta.env.VITE_API_PROD_URL
  : import.meta.env.VITE_API_DEV_URL;

const fetchArtists = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/artists`);
    artists.value = response.data;
  } catch (err) {
    console.error("Error fetching artists:", err);
    error.value = "Failed to load artists. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchArtists);
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
      <h2 class="text-center mb-4">🎤 Artists</h2>
      <ArtistList :artists="artists" />
    </div>
    <div class="text-center mt-4 d-flex justify-content-center gap-3">
      <router-link to="/artists/new" class="btn btn-primary">
        ➕ Add New Artist
      </router-link>
    </div>
  </div>
</template>
