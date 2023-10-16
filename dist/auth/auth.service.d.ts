import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AuthService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createUserDto: CreateUserDto): Promise<import(".prisma/client").User>;
    login(username: string, password: string): Promise<{
        id: number;
        name: string;
        login: string;
        AvatarUrl: string;
        days: string;
    }>;
}
