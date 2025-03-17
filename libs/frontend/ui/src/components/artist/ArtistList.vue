<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const artists = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/artists"); // Adjust API URL if needed
    artists.value = response.data;
  } catch (error) {
    console.error("Error fetching artists:", error);
  }
});
</script>

<template>
  <div class="container mt-4">
    <div v-if="artists.length === 0" class="alert alert-info text-center">
      No artists available.
    </div>

    <div class="row">
      <div v-for="artist in artists" :key="artist.id" class="col-md-4 mb-4">
        <div class="card shadow h-100">
          <div class="card-body">
            <h5 class="card-title">{{ artist.name }}</h5>
            <p class="card-text"><strong>Genre:</strong> {{ artist.genre }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
