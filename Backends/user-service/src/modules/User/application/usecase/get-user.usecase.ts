import { Injectable, Inject } from '@nestjs/common'
import { IUserRepositorie } from 'core/repositories/user.repositorie'
import { USER_REPOSITORY } from 'shared/consts/tokens.nest'
import { UserErrors } from 'core/errors/user.error'
import { UserDTOs } from '../dtos/user.dto'

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: IUserRepositorie
  ) { }

  async execute(id_user: string): Promise<UserDTOs.GetPublicData> {
    const user = await this.ensureUserNotExists(id_user)
    return user.getPublicData
  }

  private async ensureUserNotExists(id_user: string) {
    const user = await this.userRepo.findUserById(id_user)
    if (!user) throw new UserErrors.UserNotFoundError()
    return user
  }
}

