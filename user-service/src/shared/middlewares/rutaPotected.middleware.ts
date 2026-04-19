import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { verifyToken } from 'shared/utils/verifyToken'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>()

    const token = req.cookies?.['access_token'] as string | undefined
    if (!token) throw new UnauthorizedException('Not authenticated')

    const payload = verifyToken(token)

    req.user = payload

    return true
  }
}
