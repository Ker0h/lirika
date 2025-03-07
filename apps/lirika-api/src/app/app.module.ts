import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicModule, UserModule } from '@lirika/backend/features';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    MongooseModule.forRoot(process.env.MONGO_URI), // Connect to MongoDB
    MusicModule,
    UserModule,
  ]
})
export class AppModule {}
