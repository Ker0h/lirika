import { Types } from 'mongoose';
type User = Types.ObjectId;

export interface IArtist {
  id: string;
  name: string;
  genre?: string;
  biography?: string;
  debutYear?: number;
  country?: string;
  albums?: string[];
  songs?: string[];
  createdBy: User;
}

export type ICreateArtist = Omit<IArtist, 'id'>;

export type IUpdateArtist = Partial<Omit<IArtist, 'id' | 'createdBy'>>;

export type IUpsertArtist = IArtist;
