<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { AlbumList } from '@lirika/ui';

const route = useRoute();
const artist = ref(null)
const loading = ref(true);
const error = ref(null);

const api = axios.create({
  baseURL: 'https://lirika-production.up.railway.app/api',
});

const fetchArtist = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`${api.defaults.baseURL}/artists/${route.params.id}`);
    artist.value = response.data;
  } catch (err) {
    console.error("Error fetching artist:", err);
    error.value = "Failed to load artist details. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchArtist);
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
      <h2 class="text-center mb-4">🎵 Albums by {{ artist.name }}</h2>
      <AlbumList :albums="artist.albums" />
    </div>
  </div>
</template>
