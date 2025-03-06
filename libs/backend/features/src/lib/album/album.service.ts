import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from "mongoose";
import { Album } from "../schemas/album.schema";
import { CreateAlbumDto, UpdateAlbumDto } from "@lirika/backend/dto";

@Injectable()
export class AlbumService {
  constructor(@InjectModel(Album.name) private albumModel: Model<Album>) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = new this.albumModel(createAlbumDto);
    return newAlbum.save();
  }

  async findAll(): Promise<Album[]> {
    return this.albumModel.find().exec();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumModel.findById(id).exec();
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