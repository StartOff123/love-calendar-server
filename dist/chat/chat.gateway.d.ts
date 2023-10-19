import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Prisma } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { UserService } from '../user/user.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    private userService;
    constructor(chatService: ChatService, userService: UserService);
    server: Server;
    clientsCount: number;
    handleSendMessage(client: Socket, payload: Prisma.MessageCreateInput): Promise<any>;
    handleClickHeart(client: Socket): Promise<void>;
    handleViewMessage(client: Socket, id: number): Promise<void>;
    handleOffline(client: Socket, id: number): Promise<void>;
    handleTyping(client: Socket): Promise<void>;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
}
