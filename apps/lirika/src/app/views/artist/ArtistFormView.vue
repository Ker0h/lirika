<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { SongGenre, ArtistCountry } from "@lirika/shared/api";
import { Types } from "mongoose";

const name = ref("");
const biography = ref("");
const genre = ref("");
const debutYear = ref("");
const country = ref("");
const formValidated = ref(false);
const formRef = ref(null);
const router = useRouter();
const route = useRoute();
const error = ref(null);
const isEditMode = ref(false);
const userId = localStorage.getItem("userId");

const genres = Object.values(SongGenre);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// If editing, load artist data
onMounted(async () => {
  const id = route.params.id;

  if (id) {
    isEditMode.value = true;
    try {
      const { data } = await axios.get(`${api.defaults.baseURL}/artists/${id}`);
      name.value = data.name;
      biography.value = data.biography;
      genre.value = data.genre;
      debutYear.value = data.debutYear;
      country.value = data.country;
    } catch (err) {
      console.error(err);
      error.value = "Failed to load artist data.";
    }
  }
});

// Set up axios headers for authentication
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

  const payload = {
    name: name.value,
    biography: biography.value,
    genre: genre.value,
    debutYear: debutYear.value,
    country: country.value,
    createdBy: new Types.ObjectId(userId),
  };

  try {
    if (isEditMode.value) {
      await axios.put(`${api.defaults.baseURL}/artists/${route.params.id}`, payload);
    } else {
      await axios.post(`${api.defaults.baseURL}/artists`, payload);
    }

    router.push("/artists");
  } catch (err) {
    console.error(err);
    error.value = "Something went wrong while saving the artist.";
  }
};
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-center">{{ isEditMode ? "Edit Artist" : "Add New Artist" }}</h2>

    <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>

    <form ref="formRef" :class="{ 'was-validated': formValidated }" @submit.prevent="submitForm"
      class="card p-4 shadow-sm" novalidate>
      <!-- name -->
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input v-model="name" type="text" class="form-control" required minlength="2" />
        <div class="invalid-feedback">Please enter a name (at least 2 characters).</div>
      </div>

      <!-- biography -->
      <div class="mb-3">
        <label class="form-label">Biography</label>
        <textarea v-model="biography" class="form-control" rows="3" required minlength="10" />
        <div class="invalid-feedback">Please provide a biography (at least 10 characters).</div>
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

      <!-- debut year -->
      <div class="mb-3">
        <label for="debutYear" class="form-label">Debut Year</label>
        <input id="debutYear" type="number" class="form-control" v-model="debutYear" placeholder="Enter debut year"
          min="1900" :max="new Date().getFullYear()" required />
        <div class="invalid-feedback">Please enter a valid year.</div>
      </div>

      <!-- country -->
      <div class="mb-3">
        <label class="form-label">Country</label>
        <select v-model="country" class="form-select" required>
          <option disabled value="">Select country</option>
          <option v-for="(label, code) in ArtistCountry" :key="code" :value="label">
            {{ label }}
          </option>
        </select>
        <div class="invalid-feedback">Please select a country.</div>
      </div>

      <!-- submit -->
      <div class="text-center">
        <button type="submit" class="btn btn-primary">
          {{ isEditMode ? "Update Artist" : "Add Artist" }}
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
