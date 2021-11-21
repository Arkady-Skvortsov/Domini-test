import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import UserEntity from '../users/entities/users.entity';
import JwtTokenEntity from '../jwt-token/entities/jwt-token.entity';
import PresentEntity from '../presents/entities/presents.entity';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [JwtTokenModule, UsersModule],
  exports: [AuthService],
})
export class AuthModule {}
