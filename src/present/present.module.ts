import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresentService } from './present.service';
import { PresentController } from './present.controller';
import PresentEntity from './entities/present.entity';
import UserEntity from 'src/users/entities/users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [PresentService],
  controllers: [PresentController],
  imports: [TypeOrmModule.forFeature([PresentEntity, UserEntity]), UsersModule],
  exports: [PresentService],
})
export class PresentModule {}
