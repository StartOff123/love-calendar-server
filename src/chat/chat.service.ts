import { Injectable } from '@nestjs/common'
import { Message, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'

@Injectable()
export class ChatService {
    constructor(private prismaService: PrismaService) { }

    async createMessage(data: Prisma.MessageCreateInput): Promise<Message> {
        return await this.prismaService.message.create({ data })
    }

    async getMessages(): Promise<Message[]> {
        return await this.prismaService.message.findMany()
    }
}
