<script setup>
import { AlbumList } from '@lirika/ui';

import { ref, onMounted } from "vue";
import axios from "axios";

const albums = ref([]);
const loading = ref(true);
const error = ref(null);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const fetchAlbums = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`${api.defaults.baseURL}/albums`);
    albums.value = response.data;
  } catch (err) {
    console.error("Error fetching albums:", err);
    error.value = "Failed to load albums. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchAlbums);
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
      <h2 class="text-center mb-4">📀 Albums</h2>
      <AlbumList :albums="albums" />
    </div>
    <div class="text-center mt-4 d-flex justify-content-center gap-3">
      <router-link to="/albums/new" class="btn btn-primary">
        ➕ Add New Album
      </router-link>
    </div>
  </div>
</template>