import {
  ICreateSong,
  IUpdateSong,
  IUpsertSong,
  SongGenre
} from '@lirika/shared/api'

import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'

export class CreateSongDto implements ICreateSong {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  artist!: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  album!: string

  @IsEnum(SongGenre)
  genre!: SongGenre

  @IsNumber()
  @IsNotEmpty()
  duration!: number

  @IsDateString()
  @IsNotEmpty()
  releaseDate!: Date
}

export class UpdateSongDto implements IUpdateSong {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  artist!: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  album!: string

  @IsEnum(SongGenre)
  genre!: SongGenre

  @IsNumber()
  @IsNotEmpty()
  duration!: number

  @IsDateString()
  @IsNotEmpty()
  releaseDate!: Date
}

export class UpsertSongDto implements IUpsertSong {
  @IsString()
  @IsNotEmpty()
  id!: string

  @IsString()
  @IsNotEmpty()
  addedBy!: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  artist!: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  album!: string

  @IsEnum(SongGenre)
  genre!: SongGenre

  @IsNumber()
  @IsNotEmpty()
  duration!: number

  @IsDateString()
  @IsNotEmpty()
  releaseDate!: Date
}