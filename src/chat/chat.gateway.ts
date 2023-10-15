import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, OnGatewayDisconnect, WebSocketServer, ConnectedSocket, } from '@nestjs/websockets'
import { Prisma } from '@prisma/client'
import { Server, Socket } from 'socket.io'
import { ChatService } from './chat.service'
import { UserService } from '../user/user.service'

@WebSocketGateway({ cors: true, transports: ['websocket'] })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService, private userService: UserService) { }

  @WebSocketServer() server: Server
  clientsCount = 0
  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: Prisma.MessageCreateInput): Promise<any> {
    await this.chatService.createMessage(payload)
    this.server.emit('recMessage', payload)
  }

  @SubscribeMessage('clickHeart')
  async handleClickHeart(client: Socket) {
    client.broadcast.emit('click')
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    this.clientsCount++
    this.server.emit('connected', this.clientsCount)
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.clientsCount--
    this.server.emit('disconnected', this.clientsCount)
  }
}
