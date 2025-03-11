import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../app/views/HomeView.vue";
import AboutView from "../app/views/AboutView.vue";
import SongView from "../app/views/SongView.vue";
import ArtistView from "../app/views/ArtistView.vue";

const routes = [
  { path: "/", component: HomeView, name: "home" },
  { path: "/about", component: AboutView, name: "about" },
  { path: "/songs", component: SongView, name: "songs" },
  { path: "/artists", component: ArtistView, name: "artists" },
  { path: "/:pathMatch(.*)*", redirect: { name: "home" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
