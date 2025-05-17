<script setup>
import { ref, onMounted } from "vue";
import { computed } from "vue";
import { ArtistCountry } from "@lirika/shared/api";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const artist = ref(null);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common["Authorization"];
}

const countryName = computed(() => {
  if (!artist.value || !artist.value.country) return "Not specified";
  return ArtistCountry[artist.value.country] || artist.value.country;
});

const loading = ref(true);
const error = ref(null);

const fetchArtist = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`${api.defaults.baseURL}/artists/${route.params.id}`);
    artist.value = response.data;
  } catch (err) {
    console.error("Error fetching artist:", err);
    error.value = "Failed to load artist details. Please try again.";
  } finally {
    loading.value = false;
  }
};

const deleteArtist = async () => {
  if (!confirm("Are you sure you want to delete this artist?")) return;

  try {
    await axios.delete(`${api.defaults.baseURL}/artists/${route.params.id}`);
    alert("Artist deleted successfully.");
    router.push("/artists");
  } catch (err) {
    console.error("Error deleting artist:", err);
    alert("Failed to delete artist. Try again.");
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

    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>

    <div v-else>
      <div class="card shadow-lg">
        <div class="card-body">
          <h2 class="card-title text-center mb-3">{{ artist.name }}</h2>

          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <strong>🎵 Genre:</strong> {{ artist.genre || "Not specified" }}
            </li>

            <li class="list-group-item">
              <strong>📝 Biography:</strong>
              <p>{{ artist.biography || "No biography available." }}</p>
            </li>

            <li class="list-group-item">
              <strong>🌍 Country:</strong> {{ countryName }}
            </li>

            <li class="list-group-item">
              <strong>📅 Debut Year:</strong> {{ artist.debutYear || "Not specified" }}
            </li>

            <li class="list-group-item">
              <router-link :to="`/artists/${artist._id}/songs`" class="animated-link">
                <strong>🎶 Songs:</strong> {{ artist.songs.length || 0 }} songs
              </router-link>
            </li>

            <li class="list-group-item">
              <router-link :to="`/artists/${artist._id}/albums`" class="animated-link">
                <strong>📀 Albums:</strong> {{ artist.albums.length || 0 }} albums
              </router-link>
            </li>
          </ul>

          <div class="text-center mt-4 d-flex justify-content-center gap-3">
            <router-link :to="`/artists/${artist._id}/edit`" class="btn btn-primary">
              ✏️ Edit Artist
            </router-link>
            <button @click="deleteArtist" class="btn btn-danger">🗑 Delete Artist</button>
          </div>

          <div class="text-center mt-4">
            <router-link to="/artists" class="btn btn-secondary">
              🔙 Back to Artists
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
