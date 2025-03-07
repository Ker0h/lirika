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
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from '@lirika/backend/dto';
import { Artist } from '../schemas/artist.schema';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  // CREATE a new artist
  @Post()
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  // GET all artists
  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  // GET a single artist by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Artist> {
    return this.artistService.findOne(id);
  }

  // UPDATE an artist
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto
  ): Promise<Artist> {
    return this.artistService.update(id, updateArtistDto);
  }

  // DELETE an artist
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.artistService.delete(id);
  }
}
