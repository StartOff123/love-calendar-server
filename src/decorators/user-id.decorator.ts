import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { Request } from 'express'

export const UserId = createParamDecorator(
    (_: unknown, context: ExecutionContext): number | null => {
        const request = context.switchToHttp().getRequest()
        return request.user?.id ? Number(request.user.id) : null
    }
)

// function extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ')
//     return type === 'Bearer' ? token : undefined
// }