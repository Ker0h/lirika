import {
  Request,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Put,
  Logger,
  UseGuards
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from '@lirika/backend/dto';
import { Album } from '../schemas/album.schema';
import { JwtAuthGuard } from '@lirika/backend/auth';
import { AuthenticatedRequest } from '@lirika/shared/api';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  // CREATE a new album
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req: AuthenticatedRequest, @Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    const userId = req.user.userId; // Extract userId from the request object
    return this.albumService.create(createAlbumDto, userId);
  }

  // GET all albums
  @Get()
  async findAll(
    @Query('createdBy') createdBy?: string,
    @Query('artist') artistId?: string
  ): Promise<Album[]> {
    if (createdBy) {
      const albums = await this.albumService.findByUser(createdBy);
      return albums;
    }

    if (artistId) {
      const albums = await this.albumService.findByArtist(artistId);
      return albums;
    }
    return this.albumService.findAll();
  }

  // GET a single album by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Album> {
    return this.albumService.findOne(id);
  }

  // UPDATE an album
  @Put(':id')
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
