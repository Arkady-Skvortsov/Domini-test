import { Module } from '@nestjs/common';
import { SurprisesService } from './surprises.service';
import { SurprisesController } from './surprises.controller';

@Module({
  providers: [SurprisesService],
  controllers: [SurprisesController]
})
export class SurprisesModule {}
