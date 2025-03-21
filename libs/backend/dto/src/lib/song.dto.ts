import { ICreateSong, IUpdateSong, IUpsertSong, SongGenre } from '@lirika/shared/api';

import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

// Song DTO's
export class CreateSongDto implements ICreateSong {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @IsString()
  @IsNotEmpty()
  artist!: string;

  @IsString()
  @IsOptional()
  album?: string;

  @IsEnum(SongGenre)
  @IsOptional()
  genre?: SongGenre;

  @IsDateString()
  @IsOptional()
  releaseDate?: Date;

  @IsString()
  @IsNotEmpty()
  addedBy!: string;
}

export class UpdateSongDto implements IUpdateSong {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @IsString()
  @IsOptional()
  artist?: string;

  @IsString()
  @IsOptional()
  album?: string;

  @IsEnum(SongGenre)
  @IsOptional()
  genre?: SongGenre;

  @IsOptional()
  duration?: number;

  @IsDateString()
  @IsOptional()
  releaseDate?: Date;
}

export class UpsertSongDto implements IUpsertSong {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  artist!: string;

  @IsString()
  @IsOptional()
  album?: string;

  @IsEnum(SongGenre)
  @IsOptional()
  genre?: SongGenre;

  @IsOptional()
  duration?: number;

  @IsDateString()
  @IsOptional()
  releaseDate?: Date;

  @IsString()
  @IsNotEmpty()
  addedBy!: string;
}