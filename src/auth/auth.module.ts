import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PrismaService } from '../prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService]
})
export class AuthModule {}
