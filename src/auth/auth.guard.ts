import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private jwtTokenService: JwtTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const jwt = req.cookies['jwt'];

    // const verify_token = await this.jwtTokenService.verify_token(jwt);

    // const current_jwt_token = await this.jwtTokenService.find_token(
    //   verify_token,
    // );

    // if (!current_jwt_token) {
    //   throw new HttpException(
    //     'Такого игрока не существует',
    //     HttpStatus.FORBIDDEN,
    //   );
    // }

    return true;
  }
}
