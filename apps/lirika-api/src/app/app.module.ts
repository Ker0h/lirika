import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicModule, UserModule } from '@lirika/backend/features';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    MongooseModule.forRoot(process.env.MONGO_URI), // Connect to MongoDB
    MusicModule,
    AuthModule,
    UserModule,
  ]
})
export class AppModule {}
