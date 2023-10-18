import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async updateDays(id: number, dto: { days: string }) {
        return await this.prismaService.user.update({
            where: { id },
            data: {
                days: dto.days
            }
        })
    }

    async getUser(userId: number | string) {
        const user = await this.prismaService.user.findUnique({
            where: { id: Number(userId) }
        })
        
        if (user) {
            return {
                id: user.id,
                name: user.name,
            }
        }

    }
}
