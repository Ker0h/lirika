<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const artist = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchArtist = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/artists/${route.params.id}`);
    artist.value = response.data;
  } catch (err) {
    error.value = 'Failed to load artist details.';
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

    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-else>
      <div class="card">
        <div class="card-body">
          <h1 class="card-title">{{ artist.name }}</h1>
          <p class="card-text">{{ artist.genre }}</p>


          <h3 class="mt-4">Songs</h3>
          <ul class="list-group">
            <li v-for="song in artist.songs" :key="song._id" class="list-group-item">
              <router-link :to="`/songs/${song._id}`">
                {{ song.title }}
              </router-link>
              <span class="badge bg-secondary float-end">{{ song.releaseDate }}</span>
            </li>
          </ul>

          <h3 class="mt-4">Albums</h3>
          <ul class="list-group">
            <li v-for="album in artist.albums" :key="album._id" class="list-group-item">
              <router-link :to="`/albums/${album._id}`">
                {{ album.title }}
              </router-link>
              <span class="badge bg-secondary float-end">{{ album.releaseDate }}</span>
            </li>
          </ul>

          <router-link to="/artists" class="btn btn-secondary mt-3">Back to Artists</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
