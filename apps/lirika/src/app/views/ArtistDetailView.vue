<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const artist = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchartist = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/artists/${route.params.id}`);
    artist.value = response.data;
  } catch (err) {
    console.error("Error fetching artist:", err);
    error.value = "Failed to load artist details. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchartist);
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
          <h2 class="card-title text-center mb-3">{{ artist.name }}</h2>

          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <strong>🌍 Genre:</strong> {{ artist.genre || "Not specified" }}
            </li>

            <li class="list-group-item">
              <strong>🎵 Songs: </strong>
              <ul>
                <li v-for="song in artist.songs" :key="song._id">
                  <router-link :to="`/songs/${song._id}`" class="animated-link">
                    {{ song.title || "Unknown Song" }}
                  </router-link>
                </li>
              </ul>
            </li>

            <li class="list-group-item">
              <strong>💿 Albums: </strong>
              <ul>
                <li v-for="album in artist.albums" :key="album._id">
                  <router-link :to="`/albums/${album._id}`" class="animated-link">
                    {{ album.title || "Unknown Album" }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>

          <div class="text-center mt-4">
            <router-link to="/artists" class="btn btn-primary">⬅ Back to artists</router-link>
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
