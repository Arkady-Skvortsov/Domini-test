import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PresentService } from './present.service';
import { presentType } from './dto/present.dto';
import { JwtTokenGuard } from 'src/jwt-token/jwt-token.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Present')
@Controller('presents')
export class PresentController {
  constructor(private presentService: PresentService) {}

  @ApiOperation({ summary: 'Get last present with different types' })
  @ApiResponse({ type: Object, status: 200 })
  @UseGuards(JwtTokenGuard, AuthGuard)
  @Get('/last/:type/')
  async get_last_present(@Param() type: presentType, @Body() username: string) {
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
  @UseGuards(JwtTokenGuard, AuthGuard)
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
