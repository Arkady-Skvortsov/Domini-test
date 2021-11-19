import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import UserEntity from '../users/entities/users.entity';
import JwtTokenEntity from '../jwt-token/entities/jwt-token.entity';
import PresentEntity from '../present/entities/present.entity';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, JwtTokenEntity, PresentEntity]),
    JwtTokenModule,
    UsersModule,
  ],
})
export class AuthModule {}
