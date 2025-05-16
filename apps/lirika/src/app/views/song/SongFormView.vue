<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { Types } from "mongoose";
import { watch } from "vue";

import { SongGenre } from "@lirika/shared/api";

// Form fields
const title = ref("");
const genre = ref("");
const releaseYear = ref("");
const artistId = ref("");
const albumId = ref("");

// Data for dropdowns
const artists = ref([]);
const albums = ref([]);

// Form validation
const formValidated = ref(false);
const formRef = ref(null);
const error = ref(null);
const loading = ref(true);

// UserId from local storage
const userId = localStorage.getItem("userId");

// Form state
const route = useRoute();
const router = useRouter();

// Genres
const genres = Object.values(SongGenre);

const api = axios.create({
  baseURL: 'https://lirika-production.up.railway.app/api',
});

const isEditMode = computed(() => !!route.params.id);

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common["Authorization"];
}

const submitForm = async () => {
  formValidated.value = true;
  if (!formRef.value.checkValidity()) return;

  if (!userId) {
    error.value = "User not authenticated. Please log in.";
    return;
  }

  try {
    const payload = {
      title: title.value,
      genre: genre.value,
      releaseYear: releaseYear.value,
      artist: artistId.value,
      album: albumId.value,
      createdBy: new Types.ObjectId(userId),
    };

    console.log("Payload:", payload);

    if (isEditMode.value) {
      await axios.put(`${api.defaults.baseURL}/songs/${route.params.id}`, payload);
    } else {
      await axios.post(`${api.defaults.baseURL}/songs`, payload);
    }

    router.push("/songs");
  } catch (err) {
    console.error(err);
    error.value = "Something went wrong while saving the song.";
  }
};

onMounted(async () => {
  try {
    const artistResponse = await axios.get(`${api.defaults.baseURL}/artists`);
    artists.value = artistResponse.data;

    // Watch for changes in artistId to load albums
    watch(artistId, async (newArtistId) => {
      if (!newArtistId) {
        albums.value = [];
        albumId.value = "";
        return;
      }

      try {
        const response = await axios.get(`${api.defaults.baseURL}/albums?artist=${newArtistId}`);
        albums.value = response.data;

        // If there's only one album, set it as the default
        if (albums.value.length === 1) {
          albumId.value = albums.value[0]._id;
        }

        // If current albumId isn't part of new list, clear it
        if (!albums.value.find((a) => a._id === albumId.value)) {
          albumId.value = "";
        }
      } catch (err) {
        console.error("Error loading albums for artist:", err);
        error.value = "Failed to load albums for selected artist.";
      }
    });


    if (isEditMode.value) {
      const songResponse = await axios.get(`${api.defaults.baseURL}/songs/${route.params.id}`);
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
