<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const artists = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchArtists = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/artists");
    artists.value = response.data;
  } catch (err) {
    console.error("Error fetching artists:", err);
    error.value = "Failed to load artists. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchArtists);

const goToDetail = (artistId) => {
  router.push({ name: "ArtistDetail", params: { id: artistId } });
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
      <div v-for="artist in artists" :key="artist._id" class="col-md-4 mb-4">
        <div class="card artist-card shadow-sm" @click="goToDetail(artist._id)">
          <div class="card-body">
            <h5 class="card-title">{{ artist.name }}</h5>
            <p class="card-text">🌍 Genre: {{ artist.genre || "Unknown" }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.artist-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.artist-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.artist-card:active {
  transform: scale(0.98);
}
</style>
