import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateDays(dto: {
        days: string;
    }, id: number): Promise<import("@prisma/client/runtime").GetResult<{
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
}
