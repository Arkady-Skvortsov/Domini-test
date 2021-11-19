import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import AuthDTO from './dto/auth.dto';
import RegDTO from './dto/reg.dto';
import { UsersService } from 'src/users/users.service';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtTokenService: JwtTokenService,
  ) {}

  async registration(dto: RegDTO<string, number>) {
    const current_user = await this.userService.get_current_user_by_username(
      dto.username,
    );

    if (current_user)
      throw new HttpException(
        'Такой пользователь уже существует',
        HttpStatus.FORBIDDEN,
      );

    const { username, password, health, defense, coins, cristaly } = dto;

    // const salt = await bcrypt.genSalt(5);
    // const hash_password = await bcrypt.hash(password, salt);

    const new_user: RegDTO<string, number> = {
      username,
      health,
      defense,
      coins,
      password,
      cristaly,
    };

    const token = await this.jwtTokenService.generate_token(new_user);

    new_user.refreshToken = token;

    const created_user = await this.userService.create_user(new_user);

    return created_user;
  }

  async authorization(dto: AuthDTO<string>) {
    const current_user = await this.userService.get_current_user_by_username(
      dto.username,
    );

    if (!current_user)
      throw new HttpException(
        'Такого пользователя не существует',
        HttpStatus.FORBIDDEN,
      );

    await this.check_password(dto.password, current_user.password);

    return current_user;
  }

  private async check_password(dto_password: string, user_password: string) {
    try {
      const differense_password = await bcrypt.compare(
        dto_password,
        user_password,
      );

      if (!differense_password)
        throw new HttpException('Пароли не совпадают', HttpStatus.FORBIDDEN);

      return differense_password;
    } catch (e) {
      throw new HttpException('Пароли не совпадают....', HttpStatus.FORBIDDEN);
    }
  }
}
