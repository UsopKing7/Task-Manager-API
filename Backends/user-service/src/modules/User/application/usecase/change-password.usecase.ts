import { Inject, Injectable } from '@nestjs/common'
import { IUserRepositorie } from 'core/repositories/user.repositorie'
import { UserDTOs } from '../dtos/user.dto'
import { Password } from 'core/value-objects/Password'
import { USER_REPOSITORY } from 'shared/consts/tokens.nest'
import { MailService } from 'modules/Mail/infrastructure/service/main.service'
import { UserErrors } from 'core/errors/user.error'

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: IUserRepositorie,
    private readonly mailService: MailService
  ) {}

  async execute(id_user: string, password: string): Promise<UserDTOs.ResponseMessage> {
    const user = await this.userRepo.findUserById(id_user)
    if (!user) throw new UserErrors.UserNotFoundError()
    const passwordVO = await Password.create(password).hashPassword()
    await this.userRepo.changePassword(id_user, passwordVO)
    void this.mailService.sendConfirmationChangePassword(user.getEmail)
    return { message: 'Password changed successfully' }
  }
}
