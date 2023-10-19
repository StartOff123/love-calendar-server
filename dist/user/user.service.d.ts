import { PrismaService } from '../prisma.service';
export declare class UserService {
    private prismaService;
    constructor(prismaService: PrismaService);
    updateDays(id: number, dto: {
        days: string;
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        login: string;
        password: string;
        AvatarUrl: string;
        days: string;
        lastOnline: Date;
    }, unknown> & {}>;
    getUser(userId: number | string): Promise<{
        id: number;
        name: string;
        lastOnline: Date;
    }>;
    offline(id: number): Promise<{
        id: number;
        name: string;
        lastOnline: Date;
    }>;
}
