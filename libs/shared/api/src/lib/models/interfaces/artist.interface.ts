type User = string; // Assuming artists are added by a user

export interface IArtist {
  id: string;
  name: string;
  genre?: string;
  addedBy: User;
}

export type ICreateArtist = Omit<IArtist, 'id'>;

export type IUpdateArtist = Partial<Omit<IArtist, 'id' | 'addedBy'>>;

export type IUpsertArtist = IArtist;
