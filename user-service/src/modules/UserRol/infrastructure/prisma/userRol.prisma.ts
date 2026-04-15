import { Injectable } from '@nestjs/common'
import { UserRol } from 'core/entities/UserRol'
import { IUserRolRepositorie } from 'core/repositories/userRol.repositorie'
import { PrismaService } from 'shared/configs/prisma/prisma.service'

@Injectable()
export class UserRolPrisma implements IUserRolRepositorie {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: UserRol): Promise<UserRol> {
    const userRol = await this.prisma.db.userRol.create({
      data: {
        id_user: data.getIdUser,
        id_rol: data.getIdRol
      }
    })

    return UserRol.createUserRol({ id_user: userRol.id_user, id_rol: userRol.id_rol })
  }

  async findUserAndRol(id_user: string, id_rol: string): Promise<UserRol | null> {
    const userRol = await this.prisma.db.userRol.findUnique({
      where: {
        id_user_id_rol: {
          id_user,
          id_rol
        }
      }
    })

    if (!userRol) return null
    return UserRol.createUserRol({ id_user: userRol.id_user, id_rol: userRol.id_rol })
  }
}
