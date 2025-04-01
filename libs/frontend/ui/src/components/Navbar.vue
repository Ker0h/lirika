<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">Music Library</router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
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
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
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

const router = useRouter();
const isAuthenticated = ref(!!localStorage.getItem('token')); // Check if user is logged in

const logout = () => {
  localStorage.removeItem('token'); // Remove token
  isAuthenticated.value = false; // Update state
  router.push('/login'); // Redirect to login page
};
</script>

<style scoped></style>
