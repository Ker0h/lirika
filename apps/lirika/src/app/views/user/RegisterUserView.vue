<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const api = axios.create({
  baseURL: 'https://lirika-production.up.railway.app/api',
});

const router = useRouter();

const user = ref({
  username: "",
  email: "",
  password: "",
});
const confirmPassword = ref("");

const passwordMismatch = computed(() => user.value.password !== confirmPassword.value);

const registerUser = async () => {
  if (passwordMismatch.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    await axios.post(`${api.defaults.baseURL}/users/register`, user.value);
    alert("Registration successful!");
    router.push("/login");
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Failed to register.");
  }
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Register</h2>

            <form @submit.prevent="registerUser">
              <div class="mb-3">
                <label class="form-label">Username</label>
                <input v-model="user.username" type="text" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Email</label>
                <input v-model="user.email" type="email" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="user.password" type="password" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Confirm Password</label>
                <input v-model="confirmPassword" type="password" class="form-control" required />
                <div v-if="passwordMismatch" class="text-danger small mt-1">
                  Passwords do not match
                </div>
              </div>

              <button type="submit" class="btn btn-primary w-100" :disabled="passwordMismatch">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
