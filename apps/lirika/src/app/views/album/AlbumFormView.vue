<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { Types } from "mongoose";

const title = ref("");
const releaseYear = ref("");
const artistId = ref("");
const artists = ref([]);
const formValidated = ref(false);
const formRef = ref(null);
const error = ref(null);
const loading = ref(true);
const route = useRoute();
const router = useRouter();
const userId = localStorage.getItem("userId");

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
      releaseYear: releaseYear.value,
      artist: artistId.value,
      createdBy: new Types.ObjectId(userId),
    };

    if (isEditMode.value) {
      await axios.put(`${apiBaseUrl}/albums/${route.params.id}`, payload);
    } else {
      await axios.post(`${apiBaseUrl}/albums`, payload);
    }

    router.push("/albums");
  } catch (err) {
    console.error(err);
    error.value = "Something went wrong while saving the album.";
  }
};

onMounted(async () => {
  try {
    // Fetch all artists
    const artistResponse = await axios.get(`${apiBaseUrl}/artists`);
    artists.value = artistResponse.data;

    // If editing, load album data
    if (isEditMode.value) {
      const albumResponse = await axios.get(`${apiBaseUrl}/albums/${route.params.id}`);
      const album = albumResponse.data;

      title.value = album.title;
      releaseYear.value = album.releaseYear;
      artistId.value = typeof album.artist === "object" ? album.artist._id : album.artist;
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
    <h2 class="mb-4 text-center">{{ isEditMode ? "Edit Album" : "Add New Album" }}</h2>

    <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>

    <form v-if="!loading" ref="formRef" :class="{ 'was-validated': formValidated }" @submit.prevent="submitForm"
      class="card p-4 shadow-sm" novalidate>
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input v-model="title" type="text" class="form-control" required minlength="2" />
        <div class="invalid-feedback">Please enter a title (at least 2 characters).</div>
      </div>

      <!-- release year -->
      <div class="mb-3">
        <label for="releaseYear" class="form-label">Year of Release</label>
        <input id="releaseYear" type="number" class="form-control" v-model="releaseYear"
          placeholder="Enter year of release" min="1900" :max="new Date().getFullYear()" required />
        <div class="invalid-feedback">Please enter a valid year.</div>
      </div>

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

      <div class="text-center">
        <button type="submit" class="btn btn-primary">{{ isEditMode ? "Update Album" : "Add Album" }}</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
}
</style>
