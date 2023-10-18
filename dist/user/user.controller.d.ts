import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateDays(dto: {
        days: string;
    }, id: number): Promise<import(".prisma/client").User>;
    getUser(userId: number | string): Promise<{
        id: number;
        name: string;
    }>;
}
