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
import { PresentsService } from './presents.service';
import { presentType } from './dto/create-present.dto';
import { JwtTokenGuard } from 'src/jwt-token/jwt-token.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserGuard } from 'src/users/user.guard';

@ApiTags('Present')
@Controller('presents')
export class PresentsController {
  constructor(private presentService: PresentsService) {}

  @ApiOperation({ summary: 'Get last present with different types' })
  @ApiResponse({ type: Object, status: 200 })
  @UseGuards(JwtTokenGuard, AuthGuard)
  @Get('/last/:type/')
  get_last_present(@Param() type: presentType, @Body() token: string) {
    try {
      return this.presentService.get_last_present(type, token);
    } catch (e) {
      throw new HttpException(
        'Не удалось получить информацию о последней вещи, которую вы запра',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Should be send a present to users friend' })
  @ApiResponse({ type: Object, status: 201 })
  @UseGuards(JwtTokenGuard, AuthGuard, UserGuard)
  @Post('/send/:friend_name')
  async send_present_to_friend(
    @Param() friend_name: string,
    @Body() token: string,
  ) {
    try {
      return this.presentService.send_present_to_friend(friend_name, token);
    } catch (e) {
      throw new HttpException(
        'Не удалось отправить подарок другу',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
