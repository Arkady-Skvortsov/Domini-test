import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtTokenGuard } from '../jwt-token/jwt-token.guard';
import { AuthGuard } from '../auth/auth.guard';
import { InvitesService } from './invites.service';
import { inviteResponse } from './dto/create-invites.dto';

@ApiTags('Invites')
@Controller('invites')
export class InvitesController {
  constructor(private inviteService: InvitesService) {}

  @ApiOperation({ summary: 'Should be get all invites in friends' })
  @ApiResponse({
    status: 200,
    description: 'get all invites by other users or myself',
  })
  @UseGuards(JwtTokenGuard, AuthGuard)
  @Get('/all')
  async get_all_invites(@Body() token: string) {
    try {
      return this.inviteService.get_all_invites(token);
    } catch (e) {
      throw new HttpException(
        'Не удалось получить все запросы на добавление в друзья',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Should be get a current invite in friends' })
  @ApiResponse({
    status: 200,
    description: 'get a current invite by other user or myself',
  })
  @UseGuards(JwtTokenGuard, AuthGuard)
  @Get('/current/:id')
  async get_current_invite(@Body() token: string, @Param() id: number) {
    try {
      return this.inviteService.get_current_invite(token, id);
    } catch (e) {
      throw new HttpException(
        'Не удалось получить конкретный запрос на добавления в друзья',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({
    summary: 'Should be send an invite into friends to the current user',
  })
  @ApiResponse({ type: Object, status: 201 })
  @UseGuards(JwtTokenGuard, AuthGuard)
  @Post('/send/:username')
  async send_invite_in_friends(
    @Body() token: string,
    @Body() text: string,
    @Param() username: string,
  ) {
    try {
      const current_invite = await this.inviteService.send_invite_in_friends(
        token,
        text,
        username,
      );
      return `Вы отправили приглашение вашему другу ${current_invite.catcher} со словами ${current_invite.text}`;
    } catch (e) {
      throw new HttpException(
        'Не удалось отправить заявку в друзья',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Should be get an answer to the invite' })
  @ApiResponse({ type: String, status: 201 })
  @UseGuards(JwtTokenGuard, AuthGuard)
  @Post('/answer/:username')
  async answer_the_invite(
    @Param() username: string,
    @Body() token: string,
    @Body() answer: inviteResponse,
  ) {
    try {
      return this.inviteService.answer_the_invite(username, token, answer);
    } catch (e) {
      throw new HttpException(
        'Не удалось ответить на запрос',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}