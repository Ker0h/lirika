import { SongGenre } from "./song.genre";

type User = string;

export interface ISong {
  id: string;
  title: string;
  artist: string;
  album?: string; // Optional
  genre?: SongGenre; // Optional
  releaseYear?: number; // Optional
  addedBy: User;
}

export type ICreateSong = Omit<ISong, 'id' | 'addedBy'> & { addedBy: User };

export type IUpdateSong = Partial<Omit<ISong, 'id' | 'addedBy'>>;

export type IUpsertSong = ISong;
