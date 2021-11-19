import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class JwtTokenGuard implements CanActivate {
  //constructor(private jwtTokenService: JwtTokenService) {}

  async canActivate(
    context: ExecutionContext,
    @Req() request?: Request,
  ): Promise<boolean> {
    const first_part = request.body.authorization.splice(' ')[0];
    const second_part = request.body.authorization.splice(' ')[0];

    //const validate_token = await this.jwtTokenService.verify_token(second_part);

    if (!first_part && !second_part) {
      throw new HttpException(
        'Авторизация пользователя не прошла..........',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
