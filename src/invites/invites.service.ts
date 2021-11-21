import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';
import { UsersService } from 'src/users/users.service';
import CreateInviteDTO, { inviteResponse } from './dto/create-invites.dto';
import InviteEntity from './entities/invites.entity';

@Injectable()
export class InvitesService {
  constructor(
    @InjectRepository(InviteEntity)
    private inviteEntity: Repository<InviteEntity>,
    private jwtTokenService: JwtTokenService,
    private userService: UsersService,
  ) {}

  async get_all_invites(token: string) {
    const { user } = await this.jwtTokenService.find_token(token);

    console.log(user.catchInvites);

    return user.catchInvites;
  }

  async get_current_invite(username: string, id: number) {
    const { catchInvites } =
      await this.userService.get_current_user_by_username(username);
    let current_invite;

    catchInvites.map((invite) => {
      if (invite.id === id) current_invite = invite;
    });

    return current_invite;
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

    return current_invite;
  }

  async answer_the_invite(
    username: string,
    token: string,
    answer: inviteResponse,
  ) {
    const current_sender = await this.jwtTokenService.find_token(token);
    const current_catcher = await this.userService.get_current_user_by_username(
      username,
    );

    if (answer === 'Принять') {
      await this.userService.update_current_user(current_sender.user.username, {
        friends: current_catcher,
      });

      await this.userService.update_current_user(current_catcher.username, {
        friends: current_sender,
      });

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

  private async delete_current_invite(username: string, id: number) {
    try {
      const current_invite = await this.get_current_invite(username, id);

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
