import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LocalAuthGuard } from './local.auth.guard'
import { AuthenticatedGuard } from './authenticated.guard'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.create(createUserDto)
    }

    @Post('/login')
    @UseGuards(LocalAuthGuard)
    login(@Request() req: Express.Request) {
        return { ...req.user }
    }

    @Get('/login-check')
    @UseGuards(AuthenticatedGuard)
    loginCheck(@Request() req: Express.Request) {
        return { ...req.user }
    }

    @Get('/logout')
    @UseGuards(AuthenticatedGuard)
    logout(@Request() req: Express.Request) {
        req.session.destroy((_: any) => { })
        return { message: 'Вы вышли из системы' }
    }
}
