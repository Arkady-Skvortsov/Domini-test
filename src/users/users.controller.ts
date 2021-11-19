import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtTokenGuard } from 'src/jwt-token/jwt-token.guard';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Should be get all users' })
  @ApiResponse({ type: String, status: 200 })
  @UseGuards(JwtTokenGuard, AuthGuard)
  @Get('/:id')
  async get_current_resources(@Param() id: number) {
    try {
      return this.usersService.get_current_resources(id);
    } catch (e) {
      throw new HttpException(
        'Не удалось получить информацию о ресурсах',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Should be send invite into friends' })
  @ApiResponse({ type: Object, status: 201 })
  @UseGuards(JwtTokenGuard, AuthGuard)
  @Post('/invite/:catcher_id')
  async invite_in_friends(
    @Param() catcher_id: number,
    @Body() inviter: number,
  ) {
    try {
      return this.usersService.invite_in_friends(catcher_id, inviter);
    } catch (e) {
      throw new HttpException(
        'Не удалось пригласить в друзья',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
