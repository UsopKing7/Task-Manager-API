import { Injectable } from '@nestjs/common'
import { Rol } from 'core/entities/Rol'
import { EnumNameRol } from 'core/enum/user.enum'
import { IRoleRepositorie } from 'core/repositories/role.repositorie'
import { PrismaService } from 'shared/configs/prisma/prisma.service'

@Injectable()
export class RolPrisma implements IRoleRepositorie {
  constructor(private readonly prisma: PrismaService) {}

  async findByNameRol(name: EnumNameRol): Promise<Rol | null> {
    const rol = await this.prisma.db.role.findFirst({
      where: {
        name: name
      }
    })

    if (!rol) return null
    return Rol.createRol({ id_rol: rol.id_rol, name: rol.name as EnumNameRol })
  }
}
