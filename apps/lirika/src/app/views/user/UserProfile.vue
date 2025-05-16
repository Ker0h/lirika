<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

import { AlbumList, ArtistList, SongList } from "@lirika/ui";

const route = useRoute();

const user = ref(null);
const userSongs = ref([]);
const userAlbums = ref([]);
const userArtists = ref([]);
const error = ref(null);
const loading = ref(true);

const api = axios.create({
  baseURL: 'https://lirika-production.up.railway.app/api',
});

onMounted(async () => {
  try {
    const [userRes, songsRes, albumsRes, artistsRes] = await Promise.all([
      axios.get(`${api.defaults.baseURL}/users/${route.params.id}`),
      axios.get(`${api.defaults.baseURL}/songs?createdBy=${route.params.id}`),
      axios.get(`${api.defaults.baseURL}/albums?createdBy=${route.params.id}`),
      axios.get(`${api.defaults.baseURL}/artists?createdBy=${route.params.id}`),
    ]);

    user.value = userRes.data;
    userSongs.value = songsRes.data;
    userAlbums.value = albumsRes.data;
    userArtists.value = artistsRes.data;

    console.log("User data:", user.value);
  } catch (err) {
    console.error("Error loading profile data:", err);
    error.value = "Failed to load profile data.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-center">My Profile</h2>

    <div v-if="loading" class="text-center">
      <i class="bi bi-arrow-clockwise fs-1 text-primary"></i>
      <p>Loading...</p>
    </div>

    <div v-if="!loading && !user" class="alert alert-danger text-center">
      <strong>Error:</strong> User not found.
    </div>

    <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>

    <div v-if="!loading && user" class="card p-4 shadow-sm mb-4">
      <h4>User Info</h4>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Joined:</strong> {{ new Date(user.registeredAt).toLocaleDateString() }}</p>
    </div>

    <div v-if="userSongs.length" class="mt-4">
      <h4>My Songs</h4>
      <SongList :songs="userSongs" />
    </div>

    <div v-if="userArtists.length">
      <h4>My Artists</h4>
      <ArtistList :artists="userArtists" />
    </div>

    <div v-if="userAlbums.length" class="mt-4">
      <h4>My Albums</h4>
      <AlbumList :albums="userAlbums" />
    </div>

    <div v-if="!userSongs.length && !userAlbums.length && !userArtists.length && !loading"
      class="text-center text-muted mt-4">
      <em>You haven't created any content yet.</em>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
