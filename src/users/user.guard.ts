import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const username = request.current_user;
    const friendname = request.body.friend_name;
    let user_friend;

    const current_user =
      this.userService.get_current_user_by_username(username);

    current_user.then((user) => {
      user.friends.map((friend) => {
        if (friend.username === friendname) {
          user_friend = friend;
        }
      });
    });

    if (!user_friend) {
      throw new HttpException(
        'Этот пользователь вам не друг!',
        HttpStatus.BAD_REQUEST,
      );
    }

    request.friend = user_friend;

    return true;
  }
}
