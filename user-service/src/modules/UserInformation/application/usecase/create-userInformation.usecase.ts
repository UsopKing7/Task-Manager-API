import { Inject, Injectable } from '@nestjs/common'
import { IUserInformationRepositorie } from 'core/repositories/userInformation.repositorie'
import { UserInformationDTO } from '../dtos/userInformation.dto'
import { UserInformation } from 'core/entities/UserInformation'
import { UserInformationErrors } from 'core/errors/userInformation.error'
import { USER_INFORMATION_REPOSITORY } from 'shared/consts/tokens.nest'

@Injectable()
export class CreateUserInformationUseCase {
  constructor(
    @Inject(USER_INFORMATION_REPOSITORY)
    private readonly userInformationRepo: IUserInformationRepositorie
  ) {}

  async execute(data: UserInformationDTO.Create): Promise<UserInformationDTO.PublicData> {
    await this.ensureUserInformationNotExists(data.id_user)
    await this.ensureNickNameNotExists(data.nick_name)
    const userInformation = UserInformation.createUserInformation(data)
    const userInformationCreated = await this.userInformationRepo.create(userInformation)
    return userInformationCreated.getPublicData
  }

  private async ensureNickNameNotExists(nick_name: string) {
    const nickNameExists = await this.userInformationRepo.findNickName(nick_name)
    if (nickNameExists) throw new UserInformationErrors.NickNameAlreadyExists()
  }

  private async ensureUserInformationNotExists(id_user: string) {
    const userInformationExists =
      await this.userInformationRepo.findUserInformationByIdUser(id_user)
    if (userInformationExists) throw new UserInformationErrors.UserInformationAlreadyExists()
  }
}
