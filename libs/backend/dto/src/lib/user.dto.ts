import {
  ICreateUser,
  IUpdateUser,
  IUpsertUser,
  UserRole
} from '@lirika/shared/api';

import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// USER DTOs
export class CreateUserDto implements ICreateUser {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}

export class UpdateUserDto implements IUpdateUser {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

export class UpsertUserDto implements IUpsertUser {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role!: UserRole;
}
