<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  albums: {
    type: Array,
    required: true,
  },
});

const goToDetail = (albumId) => {
  router.push({ name: "AlbumDetail", params: { id: albumId } });
};
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div v-for="album in albums" :key="album._id" class="col-md-4 mb-4">
        <div class="card album-card shadow-sm" @click="goToDetail(album._id)">
          <div class="card-body">
            <h5 class="card-title">{{ album.title }}</h5>
            <p class="card-text text-muted">🎤 Artist: {{ album.artist?.name || "Unknown" }}</p>
            <p class="card-text">📅 Released: {{ album.releaseYear }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.album-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.album-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.album-card:active {
  transform: scale(0.98);
}
</style>
