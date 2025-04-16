import {
  ICreateAlbum,
  IUpdateAlbum,
  IUpsertAlbum
} from '@lirika/shared/api';

import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

// ALBUM DTOs
export class CreateAlbumDto implements ICreateAlbum {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @IsString()
  @IsNotEmpty()
  artist!: string;

  @IsNumber()
  @IsOptional()
  releaseYear?: number;

  @IsString()
  @IsNotEmpty()
  addedBy!: string;
}

export class UpdateAlbumDto implements IUpdateAlbum {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @IsString()
  @IsNotEmpty()
  artist!: string;

@IsNumber()
  @IsOptional()
  releaseYear?: number;
}

export class UpsertAlbumDto implements IUpsertAlbum {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  artist!: string;

  @IsNumber()
  @IsOptional()
  releaseYear?: number;

  @IsString()
  @IsNotEmpty()
  addedBy!: string;
}
