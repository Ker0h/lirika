import {
  ICreateArtist,
  IUpdateArtist,
  IUpsertArtist
} from '@lirika/shared/api';

import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

// ARTIST DTOs
export class CreateArtistDto implements ICreateArtist {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  biography?: string;

  @IsDate()
  @IsOptional()
  debutYear?: number;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsNotEmpty()
  addedBy!: string;
}

export class UpdateArtistDto implements IUpdateArtist {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  biography?: string;

  @IsDate()
  @IsOptional()
  debutYear?: number;

  @IsString()
  @IsOptional()
  country?: string;
}

export class UpsertArtistDto implements IUpsertArtist {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsString()
  @IsOptional()
  biography?: string;

  @IsDate()
  @IsOptional()
  debutYear?: number;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsNotEmpty()
  addedBy!: string;
}
