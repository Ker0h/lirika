import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Song, SongGenre } from '@lirika/share/api'

export type SongDocument = Song & Document;

