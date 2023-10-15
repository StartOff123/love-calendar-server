import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        return context.switchToHttp().getRequest().isAuthenticated()
    }
}