import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Album extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ type: Types.ObjectId, ref: 'Artist', required: true })
  artist!: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Song' })
  songs!: Types.ObjectId[];

  @Prop({ type: Date, default: Date.now })
  releaseDate!: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);