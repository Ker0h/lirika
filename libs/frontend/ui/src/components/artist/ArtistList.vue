<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  artists: {
    type: Array,
    required: true,
  },
});

const goToDetail = (artistId) => {
  router.push({ name: "ArtistDetail", params: { id: artistId } });
};
</script>

<template>
  <div class="container mt-4">
    <div class="row">
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
