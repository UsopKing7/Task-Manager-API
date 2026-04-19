import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { RequestUser } from './req-globals'

export const CurrentUser = createParamDecorator(
  (data: keyof RequestUser | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>()

    const user = req.user
    if (!user) throw new Error('User not found in request')
    return data ? user[data] : user
  }
)
