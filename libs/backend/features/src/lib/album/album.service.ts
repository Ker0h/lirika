import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from "mongoose";
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
    const newAlbum = new this.albumModel(createAlbumDto);
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
    return this.albumModel.find()
    .populate('artist')
    .populate('songs')
    .exec();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumModel.findById(id)
    .populate('artist')
    .populate('songs')
    .exec();

    if (!album) {
      throw new NotFoundException(`Album with ID: ${id} not found`);
    }

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