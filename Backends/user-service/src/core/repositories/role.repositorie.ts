import { Rol } from 'core/entities/Rol'
import { EnumNameRol } from 'core/enum/user.enum'

export abstract class IRoleRepositorie {
  abstract findByNameRol(name: EnumNameRol): Promise<Rol | null>
}
