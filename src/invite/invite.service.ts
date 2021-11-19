import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';
import { UsersService } from 'src/users/users.service';
import CreateInviteDTO, { inviteResponse } from './dto/create-invite.dto';
import InviteEntity from './entities/invite.entity';

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(InviteEntity)
    private inviteEntity: Repository<InviteEntity>,
    private jwtTokenService: JwtTokenService,
    private userService: UsersService,
  ) {}

  async get_all_invites(token: string) {
    const { user } = await this.jwtTokenService.find_token(token);

    return user.catchInvites;
  }

  async get_current_invite(token: string, id: number) {
    const { user } = await this.jwtTokenService.find_token(token);

    await user.catchInvites.filter((invite) => invite.id === id);
  }

  async send_invite_in_friends(token: string, text: string, username: string) {
    const { user } = await this.jwtTokenService.find_token(token);

    const current_friend = user.friends.find(
      (friend) => friend.username === username,
    );

    const current_invite = await this.create_invite({
      sender: user.username,
      text: text,
      catcher: current_friend.username,
    });

    await this.userService.update_current_user(current_friend.username, {
      catchInvites: current_invite,
    });

    return `Вы отправили уведомление вашему другу - ${current_friend.username}`;
  }

  async answer_the_invite(
    username: string,
    token: string,
    answer: inviteResponse,
  ) {
    const current_invite = await this.get_current_invite(token, 1);

    if (answer === 'Принять') {
      return this.delete_current_invite(token, 2);
    }

    if (answer === 'Отклонить') {
      return this.delete_current_invite(token, 1);
    }
  }

  private async create_invite(dto: CreateInviteDTO<string>) {
    const new_invite = await this.inviteEntity.create(dto);

    return new_invite;
  }

  private async delete_current_invite(token: string, id: number) {
    try {
      const current_invite = await this.get_current_invite(token, id);

      await this.inviteEntity.delete(current_invite);

      return current_invite;
    } catch (e) {
      throw new HttpException(
        'Не удалось удалить конкретное приглашение',
        HttpStatus.CREATED,
      );
    }
  }
}
