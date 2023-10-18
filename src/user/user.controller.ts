import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { UserId } from '../decorators/user-id.decorator'
import { AuthGuard } from '../auth/auth.guard'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Patch('/update-days')
    @UseGuards(AuthGuard)
    updateDays(@Body() dto: { days: string }, @UserId() id: number) {
        return this.userService.updateDays(id, dto)
    }

    @Get('/get-user/:userId')
    @UseGuards(AuthGuard)
    getUser(@Param('userId') userId: number | string) {
        return this.userService.getUser(userId)
    }
}
