import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from "mongoose";
import { Album } from "../schemas/album.schema";
import { Song } from "../schemas/song.schema";
import { CreateAlbumDto, UpdateAlbumDto } from "@lirika/backend/dto";
import { Artist } from "../schemas/artist.schema";

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<Album>,
    // Inject the Artist model to update the artist's albums
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    // Inject the Song model to update the album's songs
    @InjectModel(Song.name) private songModel: Model<Song>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto, userId: string): Promise<Album> {
     // Cast the createdBy field to a proper ObjectId
  const albumData = {
    ...createAlbumDto,
    artist: new Types.ObjectId(createAlbumDto.artist), // Ensure artist is an ObjectId
    createdBy: new Types.ObjectId(userId), // Ensure createdBy is an ObjectId
  };

    const newAlbum = new this.albumModel(albumData);
    await newAlbum.save(); // 🔥 this ensures newAlbum._id is generated

    // Then update the artist's albums array
    const artist = await this.artistModel.findById(createAlbumDto.artist);

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${createAlbumDto.artist} not found`);
    }

    // Cast the album ID to ObjectId
    const albumId = new Types.ObjectId((await newAlbum).id);
    artist.albums.push(albumId); // Use the generated ID of the new album
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

    return albums;
  }

  async findByArtist(artistId: string): Promise<Album[]> {
    const albums = await this.albumModel
      .find({ artist: new Types.ObjectId(artistId) })
      .populate('artist')
      .populate('songs')
      .exec();

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
  // Find the album
  const album = await this.albumModel.findById(id);
  if (!album) {
    throw new NotFoundException(`Album with ID ${id} not found`);
  }

  // Set album field to null for all songs referencing this album

  await this.songModel.updateMany(
    { album: album._id },
    { $set: { album: null } }
  );

  // Remove album from the artist's albums array
  const artist = await this.artistModel.findById(album.artist);
  if (!artist) {
    throw new NotFoundException(`Artist with ID ${album.artist} not found`);
  }

  artist.albums = artist.albums.filter(
    (albumId) => albumId.toString() !== id
  );
  // Save the artist after removing the album
  await artist.save();

  // Finally, delete the album
  const result = await this.albumModel.findByIdAndDelete(id).exec();
  if (!result) {
    throw new NotFoundException(`Album with ID ${id} not found`);
  }
}
}