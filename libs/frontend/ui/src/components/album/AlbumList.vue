<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const albums = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/albums"); // Adjust API URL if needed
    albums.value = response.data;
  } catch (error) {
    console.error("Error fetching albums:", error);
  }
});
</script>

<template>
  <div class="container mt-4">
    <div v-if="albums.length === 0" class="alert alert-info text-center">
      No albums available.
    </div>

    <div class="row">
      <div v-for="album in albums" :key="album._id" class="col-md-4 mb-4">
        <div class="card shadow h-100">
          <div class="card-body">
            <h5 class="card-title">{{ album.title }}</h5>
            <p class="card-text"><strong>Artist:</strong> {{ album.artist.name }}</p>
            <router-link :to="`/albums/${album._id}`" class="btn btn-primary">View Details</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
