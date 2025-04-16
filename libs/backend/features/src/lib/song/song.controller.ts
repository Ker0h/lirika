import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto, UpdateSongDto } from '@lirika/backend/dto';
import { Song } from '../schemas/song.schema';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  // CREATE a new song
  @Post()
  async create(@Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songService.create(createSongDto);
  }

  // GET all songs
  @Get()
  async findAll(): Promise<Song[]> {
    return this.songService.findAll();
  }

  // GET a single song by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Song> {
    return this.songService.findOne(id);
  }

  // UPDATE a song
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSongDto: UpdateSongDto
  ): Promise<Song> {
    return this.songService.update(id, updateSongDto);
  }

  // DELETE a song
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.songService.delete(id);
  }
}
