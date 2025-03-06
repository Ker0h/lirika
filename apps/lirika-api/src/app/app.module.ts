import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicModule, UserModule } from '@lirika/backend/features';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/lirika'), // Connect to MongoDB
    MusicModule,
    UserModule,
  ]
})
export class AppModule {}
