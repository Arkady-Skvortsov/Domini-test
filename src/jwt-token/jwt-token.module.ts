import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenService } from './jwt-token.service';
import UserEntity from 'src/users/entities/users.entity';
import JwtTokenEntity from './entities/jwt-token.entity';
import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
  providers: [JwtTokenService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_TOKEN_SECRET,
      signOptions: { expiresIn: '30m' },
    }),

    TypeOrmModule.forFeature([UserEntity, JwtTokenEntity]),
    UsersModule,
  ],
  exports: [JwtTokenService, JwtModule],
})
export class JwtTokenModule {}
