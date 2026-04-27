import { Injectable, Inject } from '@nestjs/common'
import { IUserRepositorie } from 'core/repositories/user.repositorie'
import { REDIS_REPOSITORY, USER_REPOSITORY } from 'shared/consts/tokens.nest'
import { UserErrors } from 'core/errors/user.error'
import { UserDTOs } from '../dtos/user.dto'
import { IRedisRepository } from 'core/repositories/redis.repositorie'
import { keyUser } from 'shared/consts/ keysRedis'

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: IUserRepositorie,

    @Inject(REDIS_REPOSITORY)
    private readonly redisRepo: IRedisRepository
  ) { }

  async execute(id_user: string): Promise<UserDTOs.GetPublicData> {
    const cache = await this.redisRepo.get(keyUser(id_user))
    if (cache) return JSON.parse(cache)

    const user = await this.ensureUserNotExists(id_user)
    await this.redisRepo.set(keyUser(id_user), JSON.stringify(user.getPublicData))
    return user.getPublicData
  }

  private async ensureUserNotExists(id_user: string) {
    const user = await this.userRepo.findUserById(id_user)
    if (!user) throw new UserErrors.UserNotFoundError()
    return user
  }
}

