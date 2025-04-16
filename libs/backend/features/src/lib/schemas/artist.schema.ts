import { ArtistCountry, SongGenre } from '@lirika/shared/api';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Artist extends Document {

  @Prop({ required: true })
  name!: string;

  @Prop({ type: String, required: true, enum: Object.values(SongGenre) })
  genre!: SongGenre;

  @Prop({ type: String })
  biography?: string;

  @Prop({ type: Number })
  debutYear?: number;

  @Prop({ type: String, enum: Object.values(ArtistCountry) })
  country?: ArtistCountry;

  @Prop({ type: [Types.ObjectId], ref: 'Song'})
  songs!: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Album'})
  albums!: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', default: '1233455666564' })
  createdBy!: User;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);