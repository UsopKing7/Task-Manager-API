import { Injectable } from '@nestjs/common'
import { EnumNameRol } from 'core/enum/user.enum'
import { IRoleRepositorie } from 'core/repositories/role.repositorie'

@Injectable()
export class CreateRolUseCase {
  constructor(private readonly rolRepo: IRoleRepositorie) {}

  async execute(name: EnumNameRol.USER) {
    return await this.rolRepo.findByNameRol(name)
  }
}
