import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt-token.service';
import { JwtTokenController } from './jwt-token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from 'src/users/entities/users.entity';
import JwtTokenEntity from './entities/jwt-token.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [JwtTokenService],
  controllers: [JwtTokenController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_TOKEN_SECRET,
      signOptions: { expiresIn: '30m' },
    }),

    TypeOrmModule.forFeature([UserEntity, JwtTokenEntity]),
    UsersModule,
  ],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
