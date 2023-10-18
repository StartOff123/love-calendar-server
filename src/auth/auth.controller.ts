import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { SignInDto } from './dto/sign-in.dto'
import { AuthGuard } from './auth.guard'
import { UserId } from '../decorators/user-id.decorator'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.create(createUserDto)
    }

    @Post('/login')
    login(@Body() signInDto: SignInDto) {
        return this.authService.login(signInDto)
    }

    @Get('/login-check')
    @UseGuards(AuthGuard)
    loginCheck(@UserId() id: number) {
        return this.authService.loginCheck(id)
    }

    @Get('/logout')
    @UseGuards(AuthGuard)
    logout(@Request() req: Express.Request) {
        req.session.destroy((_: any) => { })
        return { message: 'Вы вышли из системы' }
    }
}
