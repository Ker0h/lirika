import {
  ICreateAlbum,
  IUpdateAlbum,
  IUpsertAlbum
} from '@lirika/shared/api';

import { IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

// ALBUM DTOs
export class CreateAlbumDto implements ICreateAlbum {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @IsString()
  @IsNotEmpty()
  artist!: string;

  @IsDateString()
  @IsOptional()
  releaseDate?: Date;

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
  @IsOptional()
  artist?: string;

  @IsDateString()
  @IsOptional()
  releaseDate?: Date;
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

  @IsDateString()
  @IsOptional()
  releaseDate?: Date;

  @IsString()
  @IsNotEmpty()
  addedBy!: string;
}
