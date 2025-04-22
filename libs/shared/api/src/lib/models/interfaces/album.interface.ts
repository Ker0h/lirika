import { Types } from 'mongoose';
type User = Types.ObjectId;

export interface IAlbum {
  id: string;
  title: string;
  artist: string;
  releaseYear?: number;
  createdBy: User;
}

export type ICreateAlbum = Omit<IAlbum, 'id' | 'createdBy'> & { createdBy: User };

export type IUpdateAlbum = Partial<Omit<IAlbum, 'id' | 'createdBy'>>;

export type IUpsertAlbum = IAlbum;