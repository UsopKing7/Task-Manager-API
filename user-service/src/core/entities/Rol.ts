import { EnumNameRol } from 'core/enum/user.enum'
import { RolInterface } from 'core/interfaces/rol.interface'

export class Rol {
  constructor(
    private readonly name: EnumNameRol,
    private readonly id_rol?: string
  ) {}

  static createRol(data: RolInterface.CreateRol): Rol {
    return new Rol(data.name, data.id_rol)
  }

  get getPublicData(): RolInterface.GetRol {
    return {
      name: this.name,
      id_rol: this.id_rol!
    }
  }

  get getName(): EnumNameRol {
    return this.name
  }

  get getIdRol(): string {
    return this.id_rol!
  }
}
