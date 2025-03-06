import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from "mongoose";
import { Artist } from "../schemas/artist.schema";
import { CreateArtistDto, UpdateArtistDto } from "@lirika/backend/dto";

@Injectable()
export class ArtistService {
  constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = new this.artistModel(createArtistDto);
    return newArtist.save();
  }

  async findAll(): Promise<Artist[]> {
    return this.artistModel.find().exec();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistModel.findById(id).exec();
    if (!artist) {
      throw new NotFoundException(`Artist with ID: ${id} not found`);
    }

    return artist;
  }

    async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const updatedArtist = await this.artistModel
      .findByIdAndUpdate(id, updateArtistDto, { new: true })
      .exec();
    if (!updatedArtist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return updatedArtist;
  }

    async delete(id: string): Promise<void> {
    const result = await this.artistModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
  }
}

