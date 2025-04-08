import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../app/views/HomeView.vue";
import SongView from "../app/views/SongView.vue";
import SongDetailView from "../app/views/SongDetailView.vue";
import AlbumView from "../app/views/AlbumView.vue";
import AlbumDetailView from "../app/views/AlbumDetailView.vue";
import ArtistView from "../app/views/ArtistView.vue";
import ArtistFormView from "../app/views/ArtistFormView.vue";
import ArtistDetailView from "../app/views/ArtistDetailView.vue";
import RegisterUserView from "../app/views/RegisterUserView.vue";
import LoginView from "../app/views/LoginView.vue";
import ArtistSongsView from "../app/views/ArtistSongsView.vue";
import ArtistAlbumsView from "../app/views/ArtistAlbumsView.vue";

const routes = [
  { path: "/", component: HomeView, name: "home" },
  { path: "/register", component: RegisterUserView, name: "register" },
  { path: "/login", component: LoginView, name: "login" },
  { path: "/songs", component: SongView, name: "songs" },
  { path: '/songs/:id', component: SongDetailView, name: "SongDetail", props: true },
  { path: "/albums", component: AlbumView, name: "albums" },
  { path: '/albums/:id', component: AlbumDetailView, name: "AlbumDetail", props: true },
  { path: "/artists", component: ArtistView, name: "artists" },
  { path: "/artists/new", component: ArtistFormView, name: "ArtistCreate" },
    { path: '/artists/:id/edit', component: ArtistFormView, name: "ArtistEdit", props: true },
  { path: '/artists/:id/songs', component: ArtistSongsView, name: "ArtistSongs", props: true },
  { path: '/artists/:id/albums', component: ArtistAlbumsView, name: "ArtistAlbums", props: true },
  { path: '/artists/:id', component: ArtistDetailView, name: "ArtistDetail", props: true },
  //{ path: "/:pathMatch(.*)*", redirect: { name: "home" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
