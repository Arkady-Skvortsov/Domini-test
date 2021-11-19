import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PresentService } from './present.service';
import { presentType } from './dto/present.dto';

@ApiTags('Present')
@Controller('presents')
export class PresentController {
  constructor(private presentService: PresentService) {}

  @ApiOperation({ summary: 'Get last present with different types' })
  @ApiResponse({ type: Object, status: 200 })
  @Get('/last/:type/user/:id')
  async get_last_present(@Param() type: presentType, @Param() id: number) {
    try {
      return this.presentService.get_last_present();
    } catch (e) {
      throw new HttpException(
        'Не удалось получить информацию о последней вещи, которую вы запра',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Should be send a present to users friend' })
  @ApiResponse({ type: Object, status: 201 })
  @Post('/send/:friend_id')
  async send_present_to_friend() {
    try {
      return 'present to friend';
    } catch (e) {
      throw new HttpException(
        'Не удалось отправить подарок другу',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
