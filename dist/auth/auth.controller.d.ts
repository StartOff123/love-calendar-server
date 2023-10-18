/// <reference types="express-serve-static-core" />
/// <reference types="express-session" />
/// <reference types="multer" />
/// <reference types="passport" />
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createUser(createUserDto: CreateUserDto): Promise<import(".prisma/client").User>;
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
    logout(req: Express.Request): {
        message: string;
    };
}
