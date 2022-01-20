import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Server } from 'socket.io'

@WebSocketGateway({
  namespace: 'events',
})
export class EventsGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data
  }
}
