import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import CreatePresentDTO, { presentType } from './dto/create-present.dto';
import PresentEntity from './entities/presents.entity';

@Injectable()
export class PresentsService {
  constructor(
    @InjectRepository(PresentEntity)
    private presentEntity: Repository<PresentEntity>,
    private usersService: UsersService,
    private jwtTokenService: JwtTokenService,
  ) {}

  async send_present_to_friend(friend_name: string, token: string) {
    const { user } = await this.jwtTokenService.find_token(token);
    const friend = user.friends.filter(
      (friend) => friend.username === friend_name,
    );
  }

  async get_last_present(type: presentType, token: string) {
    const { user } = await this.jwtTokenService.find_token(token);

    if (type === 'Отпрвленный') {
    }

    if (type === 'Полученный') {
    }
  }

  private async create_present(dto: CreatePresentDTO) {
    try {
      const new_present = await this.presentEntity.create(dto);

      return new_present;
    } catch (e) {
      throw new HttpException(
        'Не удалось создать подарок для друга :(',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
