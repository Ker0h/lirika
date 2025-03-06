import { Module } from "@nestjs/common";
import { SongService } from "./song/song.service";
import { SongController } from "./song/song.controller";
import { ArtistService } from "./artist/artist.service";
import { ArtistController } from "./artist/artist.controller";
import { AlbumService } from "./album/album.service";
import { AlbumController } from "./album/album.controller";

@Module({
  controllers: [SongController, ArtistController, AlbumController],
  providers: [SongService, ArtistService, AlbumService],
  exports: [SongService, ArtistService, AlbumService],
})
export class MusicModule {}