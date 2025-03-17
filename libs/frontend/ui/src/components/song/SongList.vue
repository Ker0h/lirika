<template>
  <div class="container mt-4">
    <div v-if="songs.length === 0" class="alert alert-info text-center">
      No songs available.
    </div>

    <div class="row">
      <div v-for="song in songs" :key="song.id" class="col-md-4 mb-4">
        <div class="card shadow h-100">
          <div class="card-body">
            <h5 class="card-title">{{ song.title }}</h5>
            <p class="card-text"><strong>Artist:</strong> {{ song.artist.name }}</p>
            <p class="card-text"><strong>Album:</strong> {{ song.album.title }}</p>
            <p class="card-text"><strong>Genre:</strong> {{ song.genre }}</p>
            <p class="card-text"><strong>Release Date:</strong> {{ formatDate(song.releaseDate) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const songs = ref([]);

const fetchSongs = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/songs");
    songs.value = response.data;
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

onMounted(fetchSongs);
</script>
