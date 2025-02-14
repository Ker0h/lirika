import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Album extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ type: Types.ObjectId, ref: 'Artist', required: true })
  artist!: Types.ObjectId;

  @Prop()
  releaseDate!: Date;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);