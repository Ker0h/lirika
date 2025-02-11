import { SongGenre } from "./song.genre";

type User = string;

export interface ISong {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: SongGenre;
  duration: number;
  releaseDate: Date;
  addedBy: User;
}

export type ICreateSong = Pick<ISong, 'title' | 'artist' | 'album' | 'genre' | 'duration' | 'releaseDate'>;

export type IUpdateSong = Partial<Omit<ISong, 'id' | 'addedBy'>>;

export type IUpsertSong = ISong;
