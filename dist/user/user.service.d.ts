import { PrismaService } from '../prisma.service';
export declare class UserService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getMe(id: number): Promise<{
        id: number;
        name: string;
        login: string;
        AvatarUrl: string;
        days: string;
        online: boolean;
    }>;
    online(id: number): Promise<void>;
    offline(id: number): Promise<void>;
    updateDays(id: number, dto: {
        days: string;
    }): Promise<import(".prisma/client").User>;
    getUser(id: number | string): Promise<{
        id: number;
        name: string;
        online: boolean;
    }>;
}
