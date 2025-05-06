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
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from '@lirika/backend/dto';
import { Artist } from '../schemas/artist.schema';
import { JwtAuthGuard } from '@lirika/backend/auth';
import { AuthenticatedRequest } from '@lirika/shared/api';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  // CREATE a new artist
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req: AuthenticatedRequest, @Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    const userId = req.user.userId; // Extract userId from the request object
    return this.artistService.create(createArtistDto, userId);
  }

  // GET all artists
  @Get()
  async findAll(@Query('createdBy') createdBy?: string) {
    if (createdBy) {
      const artists = await this.artistService.findByUser(createdBy);
      return artists;
    }
    return this.artistService.findAll();
  }

  // GET a single artist by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Artist> {
    return this.artistService.findOne(id);
  }

  // UPDATE an artist
  @Put(':id')
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
