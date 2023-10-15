import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthenticatedGuard } from 'src/auth/authenticated.guard'
import { UserId } from 'src/decorators/user-id.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { storage } from './storage.config'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/get-me')
    @UseGuards(AuthenticatedGuard)
    getMe(@UserId() id: number) {
        return this.userService.getMe(id)
    }

    @Patch('/update-avatar')
    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(FileInterceptor('image', { storage: storage }))
    updateAvatar(@UploadedFile() image: Express.Multer.File, @UserId() id: number) {
        return this.userService.updateAvatar(image, id)
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
