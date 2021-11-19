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
import { JwtTokenGuard } from 'src/jwt-token/jwt-token.guard';
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
  @UseGuards(JwtTokenGuard)
  @Post('/registration')
  async registration(
    @Res() response: Response,
    @Body() dto: RegDTO<string, number>,
  ) {
    try {
      const new_user = await this.authService.registration(dto);

      response.cookie('jwt-token', new_user.jwt_token, {
        expires: new Date(Date.now() + 24 * 3600 * 1000),
        secure: true,
        httpOnly: true,
      });

      response.send(new_user);
    } catch (e) {
      throw new UnauthorizedException('Такой пользователь не зарегистрирован');
    }
  }

  @ApiOperation({ summary: 'Should be authorized a new user' })
  @ApiResponse({ type: String, status: 201 })
  @UseGuards(JwtTokenGuard, AuthGuard)
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
