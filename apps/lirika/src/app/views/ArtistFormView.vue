<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { SongGenre } from "@lirika/shared/api";
import { ArtistCountry } from "@lirika/shared/api";

const name = ref("");
const biography = ref("");
const genre = ref("");
const debutYear = ref("");
const country = ref("");
const formValidated = ref(false);
const formRef = ref(null);
const router = useRouter();
const error = ref(null);

const countries = Object.values(ArtistCountry);
const genres = Object.values(SongGenre);

const submitForm = async () => {
  formValidated.value = true;

  if (!formRef.value.checkValidity()) return;

  try {
    await axios.post("http://localhost:3000/api/artists", {
      name: name.value,
      biography: biography.value,
      genre: genre.value,
      debutYear: debutYear.value,
      country: country.value,
    });
    router.push("/artists");
  } catch (err) {
    console.error(err);
    error.value = "Something went wrong while adding the artist.";
  }
};
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-center">Add New Artist</h2>

    <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>

    <form ref="formRef" :class="{ 'was-validated': formValidated }" @submit.prevent="submitForm"
      class="card p-4 shadow-sm" novalidate>
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input v-model="name" type="text" class="form-control" required minlength="2" />
        <div class="invalid-feedback">Please enter a name (at least 2 characters).</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Biography</label>
        <textarea v-model="biography" class="form-control" rows="3" required minlength="10" />
        <div class="invalid-feedback">Please provide a biography (at least 10 characters).</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Genre</label>
        <select v-model="genre" class="form-select" required>
          <option disabled value="">Select genre</option>
          <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
        </select>
        <div class="invalid-feedback">Please select a genre.</div>
      </div>

      <div class="mb-3">
        <label for="debutYear" class="form-label">Debut Year</label>
        <input id="debutYear" type="number" class="form-control" v-model="debutYear" placeholder="Enter debut year"
          min="1900" :max="new Date().getFullYear()" required />
      </div>
      <div class="invalid-feedback">Please enter a valid year.</div>

      <div class="mb-3">
        <label class="form-label">Country</label>
        <select v-model="country" class="form-select" required>
          <option disabled value="">Select country</option>
          <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
        </select>
        <div class="invalid-feedback">Please select a country.</div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary">Add Artist</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
}
</style>
