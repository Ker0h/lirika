import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Song
import { ICreateSong } from "@lirika/shared/api";

@Injectable()
export class SongService {
  constructor(@InjectModel('Song') private songModel: Model<ISong>) {}

  async create(song: ICreateSong): Promise<ISong> {
    return this.songModel.create(song);
  }

  async findAll(): Promise<ISong[]> {
    return this.songModel.find().exec();
  }

  async findOne(id: string): Promise<ISong | null> {
    return this.songModel.findById(id).exec();
  }

  async update(id: string, song: ISong): Promise<ISong | null> {
    return this.songModel.findByIdAndUpdate(id, song, { new: true }).exec();
  }

  async remove(id: string): Promise<ISong | null> {
    return this.songModel.findByIdAndDelete(id).exec();
  }
}
