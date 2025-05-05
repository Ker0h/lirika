import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  controllers: [],
  providers: [],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
