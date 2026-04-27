import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { verifyToken } from 'shared/utils/verifyToken'
import { Request } from 'express'
import { IRedisRepository } from 'core/repositories/redis.repositorie'
import { REDIS_REPOSITORY } from 'shared/consts/tokens.nest'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(REDIS_REPOSITORY)
    private readonly redisRepo: IRedisRepository) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>()
    const token = req.cookies?.['access_token'] as string | undefined
    if (!token) throw new UnauthorizedException('Not authenticated')

    const backlist = await this.redisRepo.isBacklisted(token)
    if (backlist) throw new UnauthorizedException()
    const payload = verifyToken(token)

    req.user = payload

    return true
  }
}
