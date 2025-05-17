<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const route = useRoute();
const router = useRouter();
const album = ref(null);
const loading = ref(true);
const error = ref(null);

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common["Authorization"];
}


const fetchAlbum = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`${api.defaults.baseURL}/albums/${route.params.id}`);
    album.value = response.data;
  } catch (err) {
    error.value = 'Failed to load album details.';
  } finally {
    loading.value = false;
  }
};

const deleteAlbum = async () => {
  if (!confirm("Are you sure you want to delete this album?")) return;

  try {
    await axios.delete(`${api.defaults.baseURL}/albums/${route.params.id}`);
    alert("Album deleted successfully.");
    router.push("/albums");
  } catch (err) {
    console.error("Error deleting album:", err);
    alert("Failed to delete album. Try again.");
  }
};

onMounted(fetchAlbum);
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
          <p class="card-text"><strong>Year of Release:</strong> {{ album.releaseYear }}</p>
          <h3 class="mt-4">Songs</h3>
          <ul class="list-group">
            <li v-for="song in album.songs" :key="song.id" class="list-group-item">
              <router-link :to="`/songs/${song._id}`">
                {{ song.title }}
              </router-link>
              <span class="badge bg-secondary float-end">{{ song.releaseYear }}</span>
            </li>
          </ul>

          <div class="text-center mt-4 d-flex justify-content-center gap-3">
            <router-link :to="`/albums/${album._id}/edit`" class="btn btn-primary">
              ✏️ Edit Album
            </router-link>
            <button @click="deleteAlbum" class="btn btn-danger">🗑 Delete Album</button>
          </div>

          <div class="text-center mt-4">
            <router-link to="/albums" class="btn btn-secondary">
              🔙 Back to Albums
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
