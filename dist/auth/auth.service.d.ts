import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthService {
    private prismaService;
    private jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        login: string;
        password: string;
        AvatarUrl: string;
        days: string;
        lastOnline: Date;
    }, unknown> & {}>;
    login(signInDto: SignInDto): Promise<{
        id: number;
        name: string;
        login: string;
        AvatarUrl: string;
        days: string;
        access_token: string;
    }>;
    loginCheck(id: number): Promise<{
        id: number;
        name: string;
        login: string;
        AvatarUrl: string;
        days: string;
    }>;
}
