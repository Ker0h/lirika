import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from '@lirika/backend/dto';
import { Album } from '../schemas/album.schema';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  // CREATE a new album
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.create(createAlbumDto);
  }

  // GET all albums
  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  // GET a single album by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Album> {
    return this.albumService.findOne(id);
  }

  // UPDATE an album
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto
  ): Promise<Album> {
    return this.albumService.update(id, updateAlbumDto);
  }

  // DELETE an album
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.albumService.delete(id);
  }
}
