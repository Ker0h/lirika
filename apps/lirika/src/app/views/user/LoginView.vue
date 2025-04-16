<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();
const errorMessage = ref('');

const apiBaseUrl = import.meta.env.PROD
  ? import.meta.env.VITE_API_PROD_URL
  : import.meta.env.VITE_API_DEV_URL;

const login = async () => {
  try {
    const response = await axios.post(`${apiBaseUrl}/auth/login`, {
      email: email.value,
      password: password.value,
    });
    isAuthenticated.value = true;
    localStorage.setItem('token', response.data.access_token);
    router.push('/dashboard'); // Redirect after login
  } catch (error) {
    errorMessage.value = 'Invalid credentials';
  }
};
</script>

<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" v-model="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
    </form>
  </div>
</template>
