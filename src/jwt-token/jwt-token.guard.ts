import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class JwtTokenGuard implements CanActivate {
  constructor(private jwtTokenService: JwtTokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const first_part = request.headers.authorization.split(' ')[0];
      const second_part = request.headers.authorization.split(' ')[1];

      const validate_token = this.jwtTokenService.verify_token(second_part);

      if (first_part !== 'Bearer' && !validate_token) {
        throw new UnauthorizedException('Пользователь не авторизован');
      }

      request.token = second_part;

      return true;
    } catch (e) {
      throw new HttpException('Нет JWT токена', HttpStatus.FORBIDDEN);
    }
  }
}
