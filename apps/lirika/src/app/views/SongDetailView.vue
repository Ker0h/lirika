<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const song = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchsong = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/songs/${route.params.id}`);
    song.value = response.data;
  } catch (err) {
    error.value = 'Failed to load song details.';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchsong);
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
          <h1 class="card-title">{{ song.title }}</h1>
          <p class="card-text"><strong>Genre:</strong> {{ song.genre }}</p>
          <p class="card-text">
            <strong>Artist: </strong>
            <router-link :to="`/artists/${song.artist._id}`">
              {{ song.artist.name }}
            </router-link>
          </p>

          <p class="card-text">
            <strong>Albums: </strong>
            <router-link :to="`/albums/${song.album._id}`">
              {{ song.album.title }}
            </router-link>
          </p>

          <p class="card-text"><strong>Release Date:</strong> {{ song.releaseDate }}</p>

          <router-link to="/songs" class="btn btn-secondary mt-3">Back to songs</router-link>
        </div>
      </div>
    </div>
  </div>
</template>