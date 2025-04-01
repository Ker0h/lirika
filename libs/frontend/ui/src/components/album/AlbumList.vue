<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const albums = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchAlbums = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/albums");
    albums.value = response.data;
  } catch (err) {
    console.error("Error fetching albums:", err);
    error.value = "Failed to load albums. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchAlbums);

const goToDetail = (albumId) => {
  router.push({ name: "AlbumDetail", params: { id: albumId } });
};
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

    <div v-else class="row">
      <div v-for="album in albums" :key="album._id" class="col-md-4 mb-4">
        <div class="card album-card shadow-sm" @click="goToDetail(album._id)">
          <div class="card-body">
            <h5 class="card-title">{{ album.title }}</h5>
            <p class="card-text text-muted">🎤 Artist: {{ album.artist?.name || "Unknown" }}</p>
            <p class="card-text">📅 Released: {{ album.releaseDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.album-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.album-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.album-card:active {
  transform: scale(0.98);
}
</style>
