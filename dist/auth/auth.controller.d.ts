/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="express-session" />
/// <reference types="multer" />
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createUser(createUserDto: CreateUserDto): Promise<import(".prisma/client").User>;
    login(req: Express.Request): {};
    loginCheck(req: Express.Request): {};
    logout(req: Express.Request): {
        message: string;
    };
}
