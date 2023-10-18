import { Controller, Get, UseGuards, Res } from '@nestjs/common'
import { ChatService } from './chat.service'
import { AuthGuard } from '../auth/auth.guard'

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) { }

    @Get('/get')
    @UseGuards(AuthGuard)
    async getMessages(@Res() res) {
        const messages = await this.chatService.getMessages()
        res.json(messages)
    }
}
