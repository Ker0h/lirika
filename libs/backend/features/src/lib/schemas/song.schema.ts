import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
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

  @Prop({ type: Number, })
  releaseYear!: number;

  @Prop({ type: String, default: SongGenre.Pop })
  genre!: SongGenre

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', default: '1233455666564' })
  createdBy!: User;
}

export const SongSchema = SchemaFactory.createForClass(Song);

