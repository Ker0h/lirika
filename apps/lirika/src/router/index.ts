import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../app/views/HomeView.vue";
import ArtistView from "../app/views/artist/ArtistView.vue";
import ArtistFormView from "../app/views/artist/ArtistFormView.vue";
import ArtistDetailView from "../app/views/artist/ArtistDetailView.vue";
import AlbumView from "../app/views/album/AlbumView.vue";
import AlbumFormView from "../app/views/album/AlbumFormView.vue";
import AlbumDetailView from "../app/views/album/AlbumDetailView.vue";
import ArtistAlbumsView from "../app/views/album/ArtistAlbumsView.vue";
import SongView from "../app/views/song/SongView.vue";
import SongDetailView from "../app/views/song/SongDetailView.vue";
import ArtistSongsView from "../app/views/song/ArtistSongsView.vue";
import RegisterUserView from "../app/views/user/RegisterUserView.vue";
import LoginView from "../app/views/user/LoginView.vue";
import UserProfile from "../app/views/user/UserProfile.vue";
import SongFormView from "../app/views/song/SongFormView.vue";

const routes = [
  { path: "/", component: HomeView, name: "home" },
  { path: "/register", component: RegisterUserView, name: "register" },
  { path: "/login", component: LoginView, name: "login" },
  { path: "/profile/:id", component: UserProfile, name: "UserProfile", props: true },
  { path: "/songs", component: SongView, name: "songs" },
  { path: '/songs/:id', component: SongDetailView, name: "SongDetail", props: true },
  { path: "/songs/new", component: SongFormView, name: "SongCreate" },
  { path: '/songs/:id/edit', component: SongFormView, name: "SongEdit", props: true },
  { path: "/albums", component: AlbumView, name: "albums" },
  { path: "/albums/new", component: AlbumFormView, name: "AlbumCreate" },
  { path: '/albums/:id/edit', component: AlbumFormView, name: "AlbumEdit", props: true },
  { path: '/albums/:id', component: AlbumDetailView, name: "AlbumDetail", props: true },
  { path: "/artists", component: ArtistView, name: "artists" },
  { path: "/artists/new", component: ArtistFormView, name: "ArtistCreate" },
  { path: '/artists/:id/edit', component: ArtistFormView, name: "ArtistEdit", props: true },
  { path: '/artists/:id/songs', component: ArtistSongsView, name: "ArtistSongs", props: true },
  { path: '/artists/:id/albums', component: ArtistAlbumsView, name: "ArtistAlbums", props: true },
  { path: '/artists/:id', component: ArtistDetailView, name: "ArtistDetail", props: true },
  { path: "/:pathMatch(.*)*", redirect: { name: "home" } },
];

const router = createRouter({
  history: createWebHistory('/lirika/'),
  routes,
});

export default router;
