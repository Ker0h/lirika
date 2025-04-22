import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true, required: true })
  username!: string;

  @Prop({ unique: true, required: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ enum: ['user', 'admin'], default: 'user' })
  role!: string;

  @Prop({ default: Date.now })
  registeredAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);