import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt-token.service';
import { JwtTokenController } from './jwt-token.controller';

@Module({
  providers: [JwtTokenService],
  controllers: [JwtTokenController]
})
export class JwtTokenModule {}
