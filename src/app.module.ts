import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule, UserModule, ChatModule],
  providers: [PrismaService],
})
export class AppModule {}