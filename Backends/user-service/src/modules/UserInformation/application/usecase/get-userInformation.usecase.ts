import { Inject, Injectable } from '@nestjs/common'
import { IUserInformationRepositorie } from 'core/repositories/userInformation.repositorie'
import { REDIS_REPOSITORY, USER_INFORMATION_REPOSITORY } from 'shared/consts/tokens.nest'
import { UserInformationDTO } from '../dtos/userInformation.dto'
import { UserInformationErrors } from 'core/errors/userInformation.error'
import { IRedisRepository } from 'core/repositories/redis.repositorie'
import { keyUserInfo } from 'shared/consts/ keysRedis'

@Injectable()
export class GetUserInformationUseCase {
  constructor(
    @Inject(USER_INFORMATION_REPOSITORY)
    private readonly userInformationRepo: IUserInformationRepositorie,

    @Inject(REDIS_REPOSITORY)
    private readonly redisRepo: IRedisRepository
  ) { }

  async execute(id_user: string): Promise<UserInformationDTO.PublicData> {
    const cache = await this.redisRepo.get(keyUserInfo(id_user))
    if (cache) return JSON.parse(cache)

    const userIformation = await this.ensureUserInformationExists(id_user)
    await this.redisRepo.set(keyUserInfo(id_user), JSON.stringify(userIformation.getPublicData))
    return userIformation.getPublicData
  }

  private async ensureUserInformationExists(id_user: string) {
    const userExists = await this.userInformationRepo.findUserInformationByIdUser(id_user)
    if (!userExists) throw new UserInformationErrors.UserInformationNotExists()
    return userExists
  }
}
