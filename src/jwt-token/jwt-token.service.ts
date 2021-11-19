import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import RegDTO from 'src/auth/dto/reg.dto';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import JwtTokenEntity from './entities/jwt-token.entity';

@Injectable()
export class JwtTokenService {
  constructor(
    @InjectRepository(JwtTokenEntity)
    private jwtTokenEntity: Repository<JwtTokenEntity>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generate_token(dto: RegDTO<string, number>): Promise<string> {
    const token_payload = {
      username: dto.username,
      password: dto.password,
    };

    const token = this.jwtService.sign(token_payload);

    return token;
  }

  async refresh_token(token: string): Promise<string> {
    const current_token = await this.find_token(token);

    if (current_token) {
      current_token.token = token;

      await this.jwtTokenEntity.update(current_token.id, { token });
    }

    return current_token.token;
  }

  async find_token(token: string) {
    const current_token = await this.jwtTokenEntity.findOne({
      where: { token },
    });

    return current_token;
  }

  async verify_token(token: string) {
    return this.jwtService.verify(token);
  }
}
