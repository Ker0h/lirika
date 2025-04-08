<script setup>
import { ref } from "vue";
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  songs: {
    type: Array,
    required: true,
  },
});

const goToDetail = (songId) => {
  router.push({ name: "SongDetail", params: { id: songId } });
};
</script>

<template>
  <div class="row">
    <div v-for="song in songs" :key="song._id" class="col-md-4 mb-4">
      <div class="card song-card shadow-sm" @click="goToDetail(song._id)">
        <div class="card-body">
          <h5 class="card-title">{{ song.title }}</h5>
          <p class="card-text text-muted">🎤 Artist: {{ song.artist?.name || "Unknown" }}</p>
          <p class="card-text">📀 Album: {{ song.album?.title || "Unknown" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.song-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.song-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.song-card:active {
  transform: scale(0.98);
}
</style>
