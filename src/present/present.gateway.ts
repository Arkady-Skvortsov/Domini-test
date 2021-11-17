import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(80, { transports: ['websockets'] })
export class PresentGateway {
  @SubscribeMessage('present')
  handlePresent(client: any, @MessageBody() payload: string): string {
    return 'It"s present for u my friend';
  }
}
