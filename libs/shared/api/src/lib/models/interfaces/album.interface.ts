type User = string; // Assuming albums are added by a user

export interface IAlbum {
  id: string;
  title: string;
  artist: string;
  releaseDate?: Date;
  addedBy: User;
}

export type ICreateAlbum = Omit<IAlbum, 'id' | 'addedBy'> & { addedBy: User };

export type IUpdateAlbum = Partial<Omit<IAlbum, 'id' | 'addedBy'>>;

export type IUpsertAlbum = IAlbum;