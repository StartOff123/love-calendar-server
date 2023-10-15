import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { UserModule } from './user/user.module'
import { ChatModule } from './chat/chat.module'
import { UserId } from './decorators/user-id.decorator'

@Module({
  imports: [AuthModule, UserModule, ChatModule, ],
  providers: [PrismaService],
  exports: [UserId]
})
export class AppModule {}