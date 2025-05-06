<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-success">
    <div class="container">
      <router-link class="navbar-brand" to="/">Lirika</router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/songs">Songs</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/albums">Albums</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/artists">Artists</router-link>
          </li>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          <li v-if="isAuthenticated && userId" class="nav-item">
            <router-link class="nav-link" :to="{ name: 'UserProfile', params: { id: userId } }">
              My Profile
            </router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <button class="btn btn-danger" @click="logout">Logout</button>
          </li>
          <li class="nav-item" v-else>
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios';

const router = useRouter();
const isAuthenticated = ref(false);
const userId = ref(null);

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem('token');
  userId.value = localStorage.getItem('userId');
});

const logout = () => {
  localStorage.removeItem('token'); // Remove token
  localStorage.removeItem('userId'); // Remove user ID
  localStorage.removeItem('role'); // Remove user role
  delete axios.defaults.headers.common["Authorization"]; // Remove authorization header
  isAuthenticated.value = false; // Update state
  router.push('/login'); // Redirect to login page
};
</script>

<style scoped></style>
