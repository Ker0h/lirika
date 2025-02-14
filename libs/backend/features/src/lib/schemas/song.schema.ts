import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Artist } from './artist.schema';
import { User } from './user.schema';
import { SongGenre } from '@lirika/shared/api';

@Schema()
export class Song extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ type: Types.ObjectId, ref: 'Artist', required: true })
  artist!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Album' })
  album!: Types.ObjectId;

  @Prop()
  releaseDate!: Date;

  @Prop()
  genre!: SongGenre

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user!: User;
}

export const SongSchema = SchemaFactory.createForClass(Song);

