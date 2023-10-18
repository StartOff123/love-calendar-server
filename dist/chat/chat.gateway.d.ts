import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Prisma } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    constructor(chatService: ChatService);
    server: Server;
    clientsCount: number;
    handleSendMessage(client: Socket, payload: Prisma.MessageCreateInput): Promise<any>;
    handleClickHeart(client: Socket): Promise<void>;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
}
