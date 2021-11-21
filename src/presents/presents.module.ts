import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from 'src/users/entities/users.entity';
import PresentsEntity from './entities/presents.entity';
import { PresentsController } from './presents.controller';
import { PresentsService } from './presents.service';

@Module({
  controllers: [PresentsController],
  providers: [PresentsService],
  imports: [TypeOrmModule.forFeature([UserEntity, PresentsEntity])],
})
export class PresentsModule {}
