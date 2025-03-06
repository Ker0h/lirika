<template>
  <div class="about-page">
    <h1 class="title">About Lirika</h1>
    <p class="description">
      Lirika is a music library application that allows users to manage and explore a collection of songs, albums, and
      artists.
      Users can add, update, and organize their favorite tracks.
    </p>
    <p>
      In the future, users will
    </p>
    <h2 class="subtitle">Features</h2>
    <ul class="features">
      <li>🎵 Add and organize songs, albums, and artists</li>
      <li>🔍 Search and filter through your music library</li>
      <li>🔑 Secure authentication and user management</li>
      <li>🚀 Built with NestJS, VueJS, and Nx monorepo architecture</li>
    </ul>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.5rem;
  margin-top: 20px;
}

.features {
  list-style: none;
  padding: 0;
}

.features li {
  font-size: 1.1rem;
  margin: 5px 0;
}
</style>
