import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Param,
  Post,
  Put,
  Logger,
  UseGuards,
  Request
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto, UpdateSongDto } from '@lirika/backend/dto';
import { Song } from '../schemas/song.schema';
import { JwtAuthGuard } from '@lirika/backend/auth';
import { AuthenticatedRequest } from '@lirika/shared/api';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  // CREATE a new song
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req: AuthenticatedRequest, @Body() createSongDto: CreateSongDto): Promise<Song> {
    const userId = req.user.userId; // Extract userId from the request object
    return this.songService.create(createSongDto, userId);
  }

  // GET all songs
  @Get()
  async findAll(@Query('createdBy') createdBy?: string) {
  if (createdBy) {
    const songs = await this.songService.findByUser(createdBy);
    return songs;
  }
  return this.songService.findAll();
}

  // GET a single song by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Song> {
    return this.songService.findOne(id);
  }


  // UPDATE a song
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSongDto: UpdateSongDto
  ): Promise<Song> {
    return this.songService.update(id, updateSongDto);
  }

  // DELETE a song
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.songService.delete(id);
  }
}
