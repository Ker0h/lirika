import { SongGenre } from '@lirika/shared/api';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Artist extends Document {

  @Prop({ required: true })
  name!: string;

  @Prop({ type: String, required: true, enum: Object.values(SongGenre) })
  genre!: SongGenre;

  @Prop({ type: [Types.ObjectId], ref: 'Song' })
  songs!: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Album' })
  albums!: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);