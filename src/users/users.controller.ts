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
}
