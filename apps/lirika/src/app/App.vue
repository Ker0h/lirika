<template>
  <nav class="p-4 bg-gray-800 text-white flex gap-4">
    <router-link to="/">Home</router-link>
    <router-link to="/songs">Songs</router-link>
    <router-link to="/artists">Artists</router-link>
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>
