import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import InviteEntity from './entities/invite.entity';
import UserEntity from 'src/users/entities/users.entity';
import { JwtTokenModule } from 'src/jwt-token/jwt-token.module';

@Module({
  providers: [InviteService],
  controllers: [InviteController],
  imports: [TypeOrmModule.forFeature([InviteEntity, UserEntity])],
  exports: [InviteService],
})
export class InviteModule {}
