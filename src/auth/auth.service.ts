import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/sign-in.dto'

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService) { }

    async create(createUserDto: CreateUserDto) {
        const passworHash = await bcrypt.hash(createUserDto.password, 10)

        return await this.prismaService.user.create({
            data: {
                login: createUserDto.login,
                password: passworHash,
                name: createUserDto.name,
                days: '[{"title":"Сентябрь","month":8,"days":[{"day":1,"active":false},{"day":2,"active":false},{"day":3,"active":false},{"day":4,"active":false},{"day":5,"active":false},{"day":6,"active":false},{"day":7,"active":false},{"day":8,"active":false},{"day":9,"active":false},{"day":10,"active":false},{"day":11,"active":false},{"day":12,"active":false},{"day":13,"active":false},{"day":14,"active":false},{"day":15,"active":false},{"day":16,"active":false},{"day":17,"active":false},{"day":18,"active":false},{"day":19,"active":false},{"day":20,"active":false},{"day":21,"active":false},{"day":22,"active":false},{"day":23,"active":false},{"day":24,"active":false},{"day":25,"active":false},{"day":26,"active":false},{"day":27,"active":false},{"day":28,"active":false},{"day":29,"active":false},{"day":30,"active":false}]},{"title":"Октябрь","month":9,"days":[{"day":1,"active":false},{"day":2,"active":false},{"day":3,"active":false},{"day":4,"active":false},{"day":5,"active":false},{"day":6,"active":false},{"day":7,"active":false},{"day":8,"active":false},{"day":9,"active":false},{"day":10,"active":false},{"day":11,"active":false},{"day":12,"active":false},{"day":13,"active":false},{"day":14,"active":false},{"day":15,"active":false},{"day":16,"active":false},{"day":17,"active":false},{"day":18,"active":false},{"day":19,"active":false},{"day":20,"active":false},{"day":21,"active":false},{"day":22,"active":false},{"day":23,"active":false},{"day":24,"active":false},{"day":25,"active":false},{"day":26,"active":false},{"day":27,"active":false},{"day":28,"active":false},{"day":29,"active":false},{"day":30,"active":false},{"day":31,"active":false}]},{"title":"Ноябрь","month":10,"days":[{"day":1,"active":false},{"day":2,"active":false},{"day":3,"active":false},{"day":4,"active":false},{"day":5,"active":false},{"day":6,"active":false},{"day":7,"active":false},{"day":8,"active":false},{"day":9,"active":false},{"day":10,"active":false},{"day":11,"active":false},{"day":12,"active":false},{"day":13,"active":false},{"day":14,"active":false},{"day":15,"active":false},{"day":16,"active":false},{"day":17,"active":false},{"day":18,"active":false},{"day":19,"active":false},{"day":20,"active":false},{"day":21,"active":false},{"day":22,"active":false},{"day":23,"active":false},{"day":24,"active":false},{"day":25,"active":false},{"day":26,"active":false},{"day":27,"active":false},{"day":28,"active":false},{"day":29,"active":false},{"day":30,"active":false}]},{"title":"Декабрь","month":11,"days":[{"day":1,"active":false},{"day":2,"active":false},{"day":3,"active":false},{"day":4,"active":false},{"day":5,"active":false},{"day":6,"active":false},{"day":7,"active":false},{"day":8,"active":false},{"day":9,"active":false},{"day":10,"active":false},{"day":11,"active":false},{"day":12,"active":false},{"day":13,"active":false},{"day":14,"active":false},{"day":15,"active":false},{"day":16,"active":false},{"day":17,"active":false},{"day":18,"active":false},{"day":19,"active":false},{"day":20,"active":false},{"day":21,"active":false},{"day":22,"active":false},{"day":23,"active":false},{"day":24,"active":false},{"day":25,"active":false},{"day":26,"active":false},{"day":27,"active":false},{"day":28,"active":false},{"day":29,"active":false},{"day":30,"active":false},{"day":31,"active":false}]}]'
            }
        })
    }

    async login(signInDto: SignInDto) {
        const user = await this.prismaService.user.findUnique({ where: { login: signInDto.login } })

        if (!user) throw new UnauthorizedException('Неверный логин или пароль')
        const passwordValid = await bcrypt.compare(signInDto.password, user.password)
        if (!passwordValid) throw new UnauthorizedException('Неверный логин или пароль')

        const payload = { id: user.id }

        if (user && passwordValid) {
            return {
                id: user.id,
                name: user.name,
                login: user.login,
                AvatarUrl: user.AvatarUrl,
                days: user.days,
                access_token: await this.jwtService.signAsync(payload)
            }
        }
    }

    async loginCheck(id: number) {
        const user = await this.prismaService.user.findUnique({ where: { id } })

        return {
            id: user.id,
            name: user.name,
            login: user.login,
            AvatarUrl: user.AvatarUrl,
            days: user.days,
        }
    }
}