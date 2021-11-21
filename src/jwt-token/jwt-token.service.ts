import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import AuthDTO from 'src/auth/dto/auth.dto';
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
    };

    const token = this.jwtService.sign(token_payload);

    const new_token = await this.create_token(token, dto);

    return new_token.token;
  }

  async refresh_token(username: string, refreshToken: string) {
    const current_user = await this.userService.get_current_user_by_username(
      username,
    );

    let current_token = current_user.jwt_token.token;
    let new_token;

    if (current_token !== null) {
      current_token = refreshToken;

      new_token = await this.generate_token(current_user);
    }

    return new_token;
  }

  async find_token(token: string) {
    const current_token = await this.jwtTokenEntity.findOne({
      where: { token },
    });

    return current_token;
  }

  verify_token(token: string): Observable<boolean> {
    return this.jwtService.verify(token);
  }

  private async create_token(token: string, user: RegDTO<string, number>) {
    const new_token = await this.jwtTokenEntity.create({ token, user });

    await this.jwtTokenEntity.save(new_token);

    return new_token;
  }
}
