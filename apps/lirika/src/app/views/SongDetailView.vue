<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const song = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchSong = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/songs/${route.params.id}`);
    song.value = response.data;
  } catch (err) {
    console.error("Error fetching song:", err);
    error.value = "Failed to load song details. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchSong);
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
      <div class="card shadow-lg">
        <div class="card-body">
          <h2 class="card-title text-center mb-3">{{ song.title }}</h2>

          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <strong>🎤 Artist: </strong>
              <router-link :to="`/artists/${song.artist._id}`" class="animated-link">
                {{ song.artist.name || "Unknown Artist" }}
              </router-link>
            </li>
            <li class="list-group-item">
              <strong>💿 Album: </strong>
              <router-link :to="`/albums/${song.album._id}`" class="animated-link">
                {{ song.album.title || "Unknown Album" }}
              </router-link>
            </li>
            <li class="list-group-item">
              <strong>🎵 Genre:</strong> {{ song.genre || "Not specified" }}
            </li>
            <li class="list-group-item">
              <strong>📅 Release Date:</strong> {{ song.releaseDate }}
            </li>
          </ul>

          <div class="text-center mt-4">
            <router-link to="/songs" class="btn btn-primary">⬅ Back to Songs</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 600px;
  margin: 0 auto;
}

.list-group-item {
  font-size: 1.1rem;
}

/* Animated Links */
.animated-link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  transition: color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

.animated-link:hover {
  color: #0056b3;
  transform: scale(1.1);
}
</style>
