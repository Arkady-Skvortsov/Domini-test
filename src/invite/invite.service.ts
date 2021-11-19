import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';
import { Repository } from 'typeorm';
import CreateInviteDTO, { inviteResponse } from './dto/create-invite.dto';
import InviteEntity from './entities/invite.entity';

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(InviteEntity)
    private inviteEntity: Repository<InviteEntity>,
    private jwtTokenService: JwtTokenService,
  ) {}

  async get_all_invites(token: string) {}

  async get_current_invite(token: string) {}

  async send_invite_in_friends(token: string, username: string) {}

  async answer_the_invite(
    username: string,
    token: string,
    answer: inviteResponse,
  ) {
    if (answer === 'Принять') {
    }

    if (answer === 'Отклонить') {
    }
  }

  private async create_invite(dto: CreateInviteDTO<string>) {
    const new_invite = await this.inviteEntity.create(dto);

    return new_invite;
  }

  private async delete_invite() {
    const current_invite = await this.get_current_invite('');

    //await this.inviteEntity.delete();

    return current_invite;
  }
}
