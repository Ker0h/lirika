<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const song = ref(null);
const loading = ref(true);
const error = ref(null);

const currentUserId = localStorage.getItem("userId");

const api = axios.create({
  baseURL: 'https://lirika-production.up.railway.app/api',
});

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common["Authorization"];
}


const fetchSong = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`${api.defaults.baseURL}/songs/${route.params.id}`);
    song.value = response.data;
  } catch (err) {
    console.error("Error fetching song:", err);
    error.value = "Failed to load song details. Please try again.";
  } finally {
    loading.value = false;
  }
};

const deleteSong = async () => {
  if (!confirm("Are you sure you want to delete this song?")) return;

  try {
    await axios.delete(`${api.defaults.baseURL}/songs/${route.params.id}`);
    alert("Song deleted successfully.");
    router.push("/songs");
  } catch (err) {
    console.error("Error deleting song:", err);
    alert("Failed to delete song. Try again.");
  }
};

const isOwner = computed(() => song.value?.createdBy === currentUserId);

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
              <strong>📅 Year of Release:</strong> {{ song.releaseYear || "Not specified" }}
            </li>
          </ul>

          <div v-if="isOwner" class="text-center mt-4 d-flex justify-content-center gap-3">
            <router-link :to="`/songs/${song._id}/edit`" class="btn btn-primary">
              ✏️ Edit Song
            </router-link>
            <button @click="deleteSong" class="btn btn-danger">🗑 Delete Song</button>
          </div>

          <div class="text-center mt-4">
            <router-link to="/songs" class="btn btn-secondary">
              🔙 Back to Songs
            </router-link>
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
