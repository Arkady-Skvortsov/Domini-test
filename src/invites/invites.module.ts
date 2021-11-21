import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from 'src/users/entities/users.entity';
import InviteEntity from './entities/invites.entity';
import { InvitesController } from './invites.controller';
import { InvitesService } from './invites.service';

@Module({
  controllers: [InvitesController],
  providers: [InvitesService],
  imports: [TypeOrmModule.forFeature([InviteEntity, UserEntity])],
})
export class InvitesModule {}
