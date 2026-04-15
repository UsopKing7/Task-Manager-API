import { UserRolInterface } from 'core/interfaces/useRol.interface'

export class UserRol {
  constructor(
    private readonly id_user: string,
    private readonly id_rol: string
  ) {}

  static createUserRol(data: UserRolInterface): UserRol {
    return new UserRol(data.id_user, data.id_rol)
  }

  get getPublicData(): UserRolInterface {
    return {
      id_user: this.id_user,
      id_rol: this.id_rol
    }
  }

  get getIdUser(): string {
    return this.id_user
  }

  get getIdRol(): string {
    return this.id_rol
  }
}
