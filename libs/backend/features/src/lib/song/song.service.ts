import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from "mongoose";
import { Song } from "../schemas/song.schema";
import { CreateSongDto, UpdateSongDto, UpsertSongDto } from "@lirika/backend/dto";
import { Artist } from "../schemas/artist.schema";
import { Album } from "../schemas/album.schema";

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<Song>,
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    @InjectModel(Album.name) private albumModel: Model<Album>,
  ) {}

  async create(createSongDto: CreateSongDto, userId: string): Promise<Song> {
         // Cast the createdBy field to a proper ObjectId
  const songData = {
    ...createSongDto,
    artist: new Types.ObjectId(createSongDto.artist), // Ensure artist is an ObjectId
    album: new Types.ObjectId(createSongDto.album), // Ensure album is an ObjectId
    createdBy: new Types.ObjectId(userId),
  };

        const newSong = new this.songModel(songData);
        await newSong.save();

        const songId = new Types.ObjectId((await newSong).id);

        // Then update the album's song array
        const album = await this.albumModel.findById(createSongDto.album);

        if (!album) {
          throw new NotFoundException(`Album with ID ${createSongDto.album} not found`);
        }

        album.songs.push(songId); // Use the generated ID of the new album
        await album.save();

        // Then update the artist's song array
        const artist = await this.artistModel.findById(createSongDto.artist);
        if (!artist) {
          throw new NotFoundException(`Artist with ID ${createSongDto.artist} not found`);
        }
        artist.songs.push(songId); // Use the generated ID of the new album
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

async findByUser(userId: string) {
  return this.songModel
    .find({ createdBy: new Types.ObjectId(userId) })
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
    // revome the song from the album's songs array
    const song = await this.songModel.findById(id);
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    const album = await this.albumModel.findById(song.album);
    if (album) {
      album.songs = album.songs.filter((songId) => songId.toString() !== id);
      await album.save();
    }

    // remove the song from the artist's songs array
    const artist = await this.artistModel.findById(song.artist);
    if (artist) {
      artist.songs = artist.songs.filter((songId) => songId.toString() !== id);
      await artist.save();
    }
    // Finally, delete the song
    const result = await this.songModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
  }
}

