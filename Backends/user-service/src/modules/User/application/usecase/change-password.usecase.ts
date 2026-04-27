import { Inject, Injectable } from '@nestjs/common'
import { IUserRepositorie } from 'core/repositories/user.repositorie'
import { UserDTOs } from '../dtos/user.dto'
import { Password } from 'core/value-objects/Password'
import { REDIS_REPOSITORY, USER_REPOSITORY } from 'shared/consts/tokens.nest'
import { MailService } from 'modules/Mail/infrastructure/service/main.service'
import { UserErrors } from 'core/errors/user.error'
import { IRedisRepository } from 'core/repositories/redis.repositorie'
import { keyUser } from 'shared/consts/ keysRedis'

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: IUserRepositorie,
    private readonly mailService: MailService,

    @Inject(REDIS_REPOSITORY)
    private readonly redisRepo: IRedisRepository
  ) { }

  async execute(id_user: string, password: string): Promise<UserDTOs.ResponseMessage> {
    const user = await this.userRepo.findUserById(id_user)
    if (!user) throw new UserErrors.UserNotFoundError()

    const passwordVO = await Password.create(password).hashPassword()
    await this.userRepo.changePassword(id_user, passwordVO)

    await this.redisRepo.delete(keyUser(id_user))

    void this.mailService.sendConfirmationChangePassword(user.getEmail)
    return { message: 'Password changed successfully' }
  }
}

