import { Request } from 'express';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  registeredAt: Date;
}

interface JwtUser {
  userId: string;
  username: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user: JwtUser;
}


export type ICreateUser = Pick<IUser, 'email' | 'password'> & { role?: UserRole };

export type IUpdateUser = Partial<Omit<IUser, 'id' | 'registeredAt'>>;

export type IUpsertUser = Partial<Omit<IUser, 'registeredAt'>> & { id: string };
