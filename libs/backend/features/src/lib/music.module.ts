import { Module } from "@nestjs/common";
import { SongService } from "./song/song.service";
import { SongController } from "./song/song.controller";
import { ArtistService } from "./artist/artist.service";
import { ArtistController } from "./artist/artist.controller";
import { AlbumService } from "./album/album.service";
import { AlbumController } from "./album/album.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Song, SongSchema } from "./schemas/song.schema";
import { Artist, ArtistSchema } from "./schemas/artist.schema";
import { Album, AlbumSchema } from "./schemas/album.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
    {name: Song.name, schema: SongSchema},
    {name: Artist.name, schema: ArtistSchema},
    {name: Album.name, schema: AlbumSchema}]),
  ],
  controllers: [SongController, ArtistController, AlbumController],
  providers: [SongService, ArtistService, AlbumService],
  exports: [SongService, ArtistService, AlbumService],
})
export class MusicModule {}