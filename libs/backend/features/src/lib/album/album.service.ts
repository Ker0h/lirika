import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from "mongoose";
import { Album } from "../schemas/album.schema";
import { CreateAlbumDto, UpdateAlbumDto } from "@lirika/backend/dto";
import { Artist } from "../schemas/artist.schema";

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<Album>,
    // Inject the Artist model to update the artist's albums
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
     // Cast the createdBy field to a proper ObjectId
  const albumData = {
    ...createAlbumDto,
    createdBy: new Types.ObjectId(createAlbumDto.createdBy),
  };

    const newAlbum = new this.albumModel(albumData);
    await newAlbum.save(); // 🔥 this ensures newAlbum._id is generated

    // Then update the artist's albums array
    const artist = await this.artistModel.findById(createAlbumDto.artist);

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${createAlbumDto.artist} not found`);
    }

    artist.albums.push((await newAlbum).id); // Use the generated ID of the new album
    await artist.save();

    return newAlbum;
  }

  async findAll(): Promise<Album[]> {
    const albums = await this.albumModel.find()
    .populate('artist')
    .populate('songs')
    .exec();

    Logger.debug("All albums", albums);
    return albums;
  }

  async findByUser(userId: string): Promise<Album[]> {
    const albums = await this.albumModel
      .find({ createdBy: new Types.ObjectId(userId) })
      .populate('artist')
      .populate('songs')
      .exec();

    Logger.debug(`Albums of user: ${userId}`, albums);
    return albums;
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumModel.findById(id)
    .populate('artist')
    .populate('songs')
    .exec();

    if (!album) {
      throw new NotFoundException(`Album with ID: ${id} not found`);
    }

    Logger.debug(`Album with ID: ${id}`, album);
    return album;
  }

    async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const updatedAlbum = await this.albumModel
      .findByIdAndUpdate(id, updateAlbumDto, { new: true })
      .exec();
    if (!updatedAlbum) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return updatedAlbum;
  }

    async delete(id: string): Promise<void> {
    const result = await this.albumModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
  }
}