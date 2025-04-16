import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Album extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ type: Types.ObjectId, ref: 'Artist', required: true })
  artist!: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Song' })
  songs!: Types.ObjectId[];

  @Prop({ type: Number })
  releaseYear!: number;

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', default: '1233455666564' })
  createdBy!: User;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);