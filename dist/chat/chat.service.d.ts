import { Message, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
export declare class ChatService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createMessage(data: Prisma.MessageCreateInput): Promise<Message>;
    getMessages(): Promise<Message[]>;
}
