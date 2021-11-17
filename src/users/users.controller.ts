import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { presentType } from 'src/present/dto/present.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Should be get all users' })
  @ApiResponse({ type: String, status: 200 })
  @Get('/:id')
  async get_current_resources(@Param() id: number) {
    try {
      return id;
    } catch (e) {
      throw new HttpException(
        'Не удалось получить информацию о ресурсах',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Should be send invite into friends' })
  @ApiResponse({ type: Object, status: 201 })
  @Post('/invite/:id')
  async invite_in_friends(@Param() id: number) {
    try {
      return 'My friend';
    } catch (e) {
      throw new HttpException(
        'Не удалось пригласить в друзья',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
