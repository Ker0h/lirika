import { SongGenre } from '@lirika/shared/api';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Artist extends Document {

  @Prop({ required: true })
  name!: string;

  @Prop()
  genre!: SongGenre;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);