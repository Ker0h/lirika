import { SongGenre } from "./song.genre";

import { Types } from 'mongoose';
type User = Types.ObjectId;
export interface ISong {
  id: string;
  title: string;
  artist: string;
  album?: string; // Optional
  genre?: SongGenre; // Optional
  releaseYear?: number; // Optional
  createdBy: User;
}

export type ICreateSong = Omit<ISong, 'id' | 'createdBy'> & { createdBy: User };

export type IUpdateSong = Partial<Omit<ISong, 'id' | 'createdBy'>>;

export type IUpsertSong = ISong;
