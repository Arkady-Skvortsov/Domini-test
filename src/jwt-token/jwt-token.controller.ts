import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { timeStamp } from 'console';
import RegDTO from 'src/auth/dto/reg.dto';
import { jwtToken } from './dto/jwt-token.dto';
import { JwtTokenService } from './jwt-token.service';

@ApiTags('jwt-token')
@Controller('jwt-token')
export class JwtTokenController {
  constructor(private jwtTokenService: JwtTokenService) {}

  async generate_tokens(dto: RegDTO<string, number>) {}

  async refresh_token(token: string) {}

  private async find_token(token: jwtToken) {}
}
