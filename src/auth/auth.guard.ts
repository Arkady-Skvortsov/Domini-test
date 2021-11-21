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
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtTokenService: JwtTokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    this.jwtTokenService.verify_token(request.token);

    const current_jwt_token = this.jwtTokenService.find_token(request.token);

    if (!current_jwt_token) {
      throw new HttpException(
        'Такого игрока не существует',
        HttpStatus.FORBIDDEN,
      );
    }

    request.user = current_jwt_token;

    return true;
  }
}
