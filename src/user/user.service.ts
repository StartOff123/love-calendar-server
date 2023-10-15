import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async getMe(id: number) {
        const user = await this.prismaService.user.findUnique({ where: { id } })
        const { password, ...data } = user

        return {
            ...data
        }
    }

    async online(id: number) {
        await this.prismaService.user.update({
            where: { id },
            data: {
                online: true
            }
        })
    }

    async offline(id: number) {
        await this.prismaService.user.update({
            where: { id },
            data: {
                online: false
            }
        })
    }

    async updateDays(id: number, dto: { days: string }) {
        return await this.prismaService.user.update({
            where: { id },
            data: {
                days: dto.days
            }
        })
    }

    async getUser(id: number | string) {
        const user = await this.prismaService.user.findUnique({
            where: { id: Number(id) }
        })

        return {
            id: user.id,
            name: user.name,
            online: user.online
        }
    }
}
