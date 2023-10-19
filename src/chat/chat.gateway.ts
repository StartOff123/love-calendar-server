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
    const message = await this.chatService.createMessage(payload)
    this.server.emit('recMessage', message)
  }

  @SubscribeMessage('clickHeart')
  async handleClickHeart(client: Socket) {
    client.broadcast.emit('click')
  }

  @SubscribeMessage('viewMessage')
  async handleViewMessage(client: Socket, id: number) {
    const message = await this.chatService.vievedMessage(id)
    client.broadcast.emit('sendViewMessage', message)
  }

  @SubscribeMessage('offline')
  async handleOffline(client: Socket, id: number) {
    const user = await this.userService.offline(id)
    client.broadcast.emit('sendOffline', user)
  }

  @SubscribeMessage('typing')
  async handleTyping(client: Socket) {
    client.broadcast.emit('sendTyping', true)
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
