import { Controller, Get, UseGuards, Res } from '@nestjs/common'
import { ChatService } from './chat.service'
import { AuthenticatedGuard } from 'src/auth/authenticated.guard'

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) { }

    @Get('/get')
    @UseGuards(AuthenticatedGuard)
    async getMessages(@Res() res) {
        const messages = await this.chatService.getMessages()
        res.json(messages)
    }
}
