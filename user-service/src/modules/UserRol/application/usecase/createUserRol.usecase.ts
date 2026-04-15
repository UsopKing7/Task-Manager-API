import { Inject, Injectable } from '@nestjs/common'
import { IUserRolRepositorie } from 'core/repositories/userRol.repositorie'
import { UserRolDTOs } from '../dtos/userRol.dto'
import { UserRol } from 'core/entities/UserRol'
import { USER_ROLE_REPOSITORY } from 'shared/consts/tokens.nest'

@Injectable()
export class CreateUserRolUseCase {
  constructor(
    @Inject(USER_ROLE_REPOSITORY)
    private readonly userRolRepo: IUserRolRepositorie
  ) {}

  async execute(data: UserRolDTOs.CreateUserRolProps): Promise<UserRolDTOs.PublicData> {
    const userRolExists = await this.userRolRepo.findUserAndRol(data.id_user, data.id_rol)
    if (userRolExists) {
      return userRolExists.getPublicData
    }
    const userRol = UserRol.createUserRol(data)
    const userRolCreated = await this.userRolRepo.create(userRol)
    return userRolCreated.getPublicData
  }
}
