import {
  Controller,
  HttpException,
  Body,
  HttpStatus,
  Post,
  UseGuards,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import AuthDTO from './dto/auth.dto';
import RegDTO from './dto/reg.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Should be registered a new user' })
  @ApiResponse({ type: String, status: 201 })
  @Post('/registration')
  async registration(@Body() dto: RegDTO<string, number>) {
    try {
      return this.authService.registration(dto);
    } catch (e) {
      throw new UnauthorizedException('Такой пользователь не зарегистрирован');
    }
  }

  @ApiOperation({ summary: 'Should be authorized a new user' })
  @ApiResponse({ type: String, status: 201 })
  @UseGuards(AuthGuard)
  @Post('/authorization')
  async authorization(dto: AuthDTO<string>) {
    try {
      return this.authService.authorization(dto);
    } catch (e) {
      throw new HttpException(
        'Не удалось авторизоваться',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
