import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  async get_current_resources() {
    try {
      return 'Resources';
    } catch (e) {
      throw new HttpException(
        'Не удалось получить информацию о ресурсах',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
