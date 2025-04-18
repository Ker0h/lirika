import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from "mongoose";
import { Song } from "../schemas/song.schema";
import { CreateSongDto, UpdateSongDto, UpsertSongDto } from "@lirika/backend/dto";
import { Artist } from "../schemas/artist.schema";
import { Album } from "../schemas/album.schema";

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<Song>,
    @InjectModel(Artist.name) private artistModel: Model<any>,
    @InjectModel(Album.name) private albumModel: Model<any>,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
        const newSong = new this.songModel(createSongDto);
        await newSong.save();

        // Then update the album's song array
        const album = await this.albumModel.findById(createSongDto.album);

        if (!album) {
          throw new NotFoundException(`Album with ID ${createSongDto.album} not found`);
        }

        album.songs.push((await newSong).id); // Use the generated ID of the new album
        await album.save();

        // Then update the artist's song array
        const artist = await this.artistModel.findById(createSongDto.artist);
        if (!artist) {
          throw new NotFoundException(`Artist with ID ${createSongDto.artist} not found`);
        }
        artist.songs.push((await newSong).id); // Use the generated ID of the new album
        await artist.save();

        return newSong;
      }


  async findAll(): Promise<Song[]> {
    return this.songModel
    .find()
    .populate('artist')
    .populate('album')
    .exec();
  }

  async findOne(id: string): Promise<Song> {
    const song = await this.songModel.findById(id)
    .populate('artist')
    .populate('album')
    .exec();
    if (!song) {
      throw new NotFoundException(`Song with ID: ${id} not found`);
    }

    return song;
  }

    async update(id: string, updateSongDto: UpdateSongDto): Promise<Song> {
    const updatedSong = await this.songModel
      .findByIdAndUpdate(id, updateSongDto, { new: true })
      .exec();
    if (!updatedSong) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return updatedSong;
  }

    async delete(id: string): Promise<void> {
    const result = await this.songModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
  }
}

