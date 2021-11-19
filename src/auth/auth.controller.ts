import {
  Controller,
  HttpException,
  Body,
  HttpStatus,
  Post,
  UseGuards,
  Res,
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
  async registration(
    @Res() res: Response,
    @Body() dto: RegDTO<string, number>,
  ) {
    try {
      console.log(dto);

      //return this.authService.registration(dto);

      // res.cookie('jwt', user.jwt_token, {
      //   expires: new Date(Date.now() * 24 * 60 * 60 * 3600),
      //   secure: true,
      // });
    } catch (e) {
      console.log(e);
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
