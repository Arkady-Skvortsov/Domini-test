import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtTokenGuard } from 'src/jwt-token/jwt-token.guard';
import { UserGuard } from 'src/users/user.guard';

@WebSocketGateway(3001)
export class PresentGateway {
  // @UseGuards(JwtTokenGuard, AuthGuard, UserGuard)
  @SubscribeMessage('present')
  handle_present_to_friend(
    @MessageBody() payload: string,
    @ConnectedSocket() socket: WebSocket,
  ): any {
    try {
      console.log(payload);

      socket.send(
        JSON.stringify({ event: 'Hello world', data: 'Hello world' }),
      );

      return { event: 'hello world2', data: 'some data 2' };
    } catch (e) {
      throw new HttpException(
        'Не удалось отправить подарок другу',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
