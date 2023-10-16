import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
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
    updateDays(dto: {
        days: string;
    }, id: number): Promise<import(".prisma/client").User>;
    getUser(id: number | string): Promise<{
        id: number;
        name: string;
        online: boolean;
    }>;
}
