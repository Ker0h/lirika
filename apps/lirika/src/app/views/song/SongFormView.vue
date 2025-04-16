<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

import { SongGenre } from "@lirika/shared/api";

const title = ref("");
const genre = ref("");
const releaseYear = ref("");
const artistId = ref("");
const albumId = ref("");

const artists = ref([]);
const albums = ref([]);

const formValidated = ref(false);
const formRef = ref(null);
const error = ref(null);
const loading = ref(true);
const route = useRoute();
const router = useRouter();

const genres = Object.values(SongGenre);

const apiBaseUrl = import.meta.env.PROD
  ? import.meta.env.VITE_API_PROD_URL
  : import.meta.env.VITE_API_DEV_URL;

const isEditMode = computed(() => !!route.params.id);

const submitForm = async () => {
  formValidated.value = true;
  if (!formRef.value.checkValidity()) return;

  try {
    const payload = {
      title: title.value,
      genre: genre.value,
      releaseYear: releaseYear.value,
      artist: artistId.value,
      album: albumId.value,
    };

    if (isEditMode.value) {
      await axios.put(`${apiBaseUrl}/songs/${route.params.id}`, payload);
    } else {
      await axios.post(`${apiBaseUrl}/songs`, payload);
    }

    router.push("/songs");
  } catch (err) {
    console.error(err);
    error.value = "Something went wrong while saving the song.";
  }
};

onMounted(async () => {
  try {
    const [artistResponse, albumResponse] = await Promise.all([
      axios.get(`${apiBaseUrl}/artists`),
      axios.get(`${apiBaseUrl}/albums`),
    ]);

    artists.value = artistResponse.data;
    albums.value = albumResponse.data;

    if (isEditMode.value) {
      const songResponse = await axios.get(`${apiBaseUrl}/songs/${route.params.id}`);
      const song = songResponse.data;

      title.value = song.title;
      genre.value = song.genre;
      releaseYear.value = song.releaseYear;
      artistId.value = typeof song.artist === "object" ? song.artist._id : song.artist;
      albumId.value = typeof song.album === "object" ? song.album._id : song.album;
    }
  } catch (err) {
    console.error("Error loading form data:", err);
    error.value = "Failed to load form data.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-center">{{ isEditMode ? "Edit Song" : "Add New Song" }}</h2>

    <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>

    <form v-if="!loading" ref="formRef" :class="{ 'was-validated': formValidated }" @submit.prevent="submitForm"
      class="card p-4 shadow-sm" novalidate>
      <!-- Title -->
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input v-model="title" type="text" class="form-control" required minlength="2" />
        <div class="invalid-feedback">Please enter a title (at least 2 characters).</div>
      </div>

      <!-- genre -->
      <div class="mb-3">
        <label class="form-label">Genre</label>
        <select v-model="genre" class="form-select" required>
          <option disabled value="">Select genre</option>
          <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
        </select>
        <div class="invalid-feedback">Please select a genre.</div>
      </div>

      <!-- Release Year -->
      <div class="mb-3">
        <label for="releaseYear" class="form-label">Year of Release</label>
        <input id="releaseYear" type="number" class="form-control" v-model="releaseYear"
          placeholder="Enter year of release" min="1900" :max="new Date().getFullYear()" required />
        <div class="invalid-feedback">Please enter a valid year.</div>
      </div>

      <!-- Artist -->
      <div class="mb-3">
        <label class="form-label">Artist</label>
        <select v-model="artistId" class="form-select" required>
          <option disabled value="">Select artist</option>
          <option v-for="artist in artists" :key="artist._id" :value="artist._id">
            {{ artist.name }}
          </option>
        </select>
        <div class="invalid-feedback">Please select an artist.</div>
      </div>

      <!-- Album -->
      <div class="mb-3">
        <label class="form-label">Album</label>
        <select v-model="albumId" class="form-select" required>
          <option disabled value="">Select album</option>
          <option v-for="album in albums" :key="album._id" :value="album._id">
            {{ album.title }}
          </option>
        </select>
        <div class="invalid-feedback">Please select an album.</div>
      </div>

      <!-- Submit -->
      <div class="text-center">
        <button type="submit" class="btn btn-primary">
          {{ isEditMode ? "Update Song" : "Add Song" }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
}
</style>
