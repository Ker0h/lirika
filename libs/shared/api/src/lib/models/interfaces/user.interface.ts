export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}

export type ICreateUser = Pick<IUser, 'email' | 'password'> & { role?: UserRole };

export type IUpdateUser = Partial<Omit<IUser, 'id'>>;

export type IUpsertUser = IUser;
