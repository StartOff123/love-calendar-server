import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthenticatedGuard } from '../auth/authenticated.guard'
import { UserId } from '../decorators/user-id.decorator'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/get-me')
    @UseGuards(AuthenticatedGuard)
    getMe(@UserId() id: number) {
        return this.userService.getMe(id)
    }

    @Get('/online')
    @UseGuards(AuthenticatedGuard)
    online(@UserId() id: number) {
        return this.userService.online(id)
    }

    @Get('/offline')
    @UseGuards(AuthenticatedGuard)
    offline(@UserId() id: number) {
        return this.userService.offline(id)
    }

    @Patch('/update-days')
    @UseGuards(AuthenticatedGuard)
    updateDays(@Body() dto: { days: string }, @UserId() id: number) {
        return this.userService.updateDays(id, dto)
    }

    @Get('/get-user/:id')
    @UseGuards(AuthenticatedGuard)
    getUser(@Param('id') id: number | string) {
        return this.userService.getUser(id)
    }
}
