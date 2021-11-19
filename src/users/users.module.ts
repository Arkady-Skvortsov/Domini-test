import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import InviteEntity from 'src/invite/entities/invite.entity';
import JwtTokenEntity from 'src/jwt-token/entities/jwt-token.entity';
import PresentEntity from 'src/present/entities/present.entity';
import FriendsEntity from './entities/friends.entity';
import UserEntity from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      FriendsEntity,
      PresentEntity,
      InviteEntity,
      JwtTokenEntity,
    ]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
