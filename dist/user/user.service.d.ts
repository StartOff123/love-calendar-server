import { PrismaService } from '../prisma.service';
export declare class UserService {
    private prismaService;
    constructor(prismaService: PrismaService);
    updateDays(id: number, dto: {
        days: string;
    }): Promise<import(".prisma/client").User>;
    getUser(userId: number | string): Promise<{
        id: number;
        name: string;
    }>;
}
