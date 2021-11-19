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
import { inviteResponse } from './dto/create-invite.dto';
import { InviteService } from './invite.service';

@ApiTags('Invite')
@Controller('invite')
export class InviteController {
  constructor(private inviteService: InviteService) {}

  @ApiOperation({ summary: 'Should be get a current invite in friends' })
  @ApiResponse({
    status: 200,
    description: 'get a current invite by other user or myself',
  })
  @UseGuards(JwtTokenGuard, AuthGuard)
  @Get('/current/:id')
  async get_current_invite(token: string) {
    try {
      return this.inviteService.get_current_invite(token);
    } catch (e) {
      throw new HttpException(
        'Не удалось получить запрос на добавление в друзья..',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Should be get all invites in friends' })
  @ApiResponse({
    status: 200,
    description: 'get all invites by other users or myself',
  })
  @UseGuards(JwtTokenGuard, AuthGuard)
  @Get('/all')
  async get_all_invites(token: string) {
    try {
      return this.inviteService.get_all_invites(token);
    } catch (e) {
      throw new HttpException(
        'Не удалось получить все запросы на добавление в друзья',
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
    @Param() username: string,
  ) {
    try {
      return this.inviteService.send_invite_in_friends(token, username);
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
