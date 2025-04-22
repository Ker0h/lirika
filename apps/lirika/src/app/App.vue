<script setup>
import { Navbar, Footer } from "@lirika/ui"
</script>

<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <Navbar />
    <main class="flex-fill">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>
