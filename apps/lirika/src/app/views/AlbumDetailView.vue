<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const album = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchalbum = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/albums/${route.params.id}`);
    album.value = response.data;
  } catch (err) {
    error.value = 'Failed to load album details.';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchalbum);
</script>

<template>
  <div class="container mt-4">
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-else>
      <div class="card">
        <div class="card-body">
          <h1 class="card-title">{{ album.title }}</h1>
          <p class="card-text">
            <strong>Artist: </strong>
            <router-link :to="`/artists/${album.artist._id}`">
              {{ album.artist.name }}
            </router-link>
          </p>
          <p class="card-text"><strong>Release Date:</strong> {{ album.releaseDate }}</p>
          <h3 class="mt-4">Songs</h3>
          <ul class="list-group">
            <li v-for="song in album.songs" :key="song.id" class="list-group-item">
              <router-link :to="`/songs/${song._id}`">
                {{ song.title }}
              </router-link>
              <span class="badge bg-secondary float-end">{{ song.releaseDate }}</span>
            </li>
          </ul>

          <router-link to="/albums" class="btn btn-secondary mt-3">Back to albums</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
