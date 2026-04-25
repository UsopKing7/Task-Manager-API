import { Injectable } from '@nestjs/common'
import { User } from 'core/entities/User'
import { EnumUserStatus } from 'core/enum/user.enum'
import { IUserRepositorie } from 'core/repositories/user.repositorie'
import { PrismaService } from 'shared/configs/prisma/prisma.service'

@Injectable()
export class UserPrisma implements IUserRepositorie {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: User): Promise<User> {
    const userCreated = await this.prisma.db.user.create({
      data: {
        email: data.getEmail,
        password: data.getPassword
      }
    })

    return User.fromPersistence({
      id_user: userCreated.id_user,
      email: userCreated.email,
      password: userCreated.password,
      status: userCreated.status as EnumUserStatus,
      deletedAt: userCreated.deletedAt
    })
  }

  async findUserById(id_user: string): Promise<User | null> {
    const user = await this.prisma.db.user.findUnique({
      where: { id_user },
      include: { roles: { include: { role: true } } }
    })

    if (!user) return null

    return User.fromPersistence({
      id_user: user.id_user,
      email: user.email,
      password: user.password,
      status: user.status as EnumUserStatus,
      deletedAt: user.deletedAt,
      roles: user.roles.map(role => role.role.name)
    })
  }

  async updateUser(id_user: string, status: EnumUserStatus): Promise<User> {
    const userUpdated = await this.prisma.db.user.update({
      where: { id_user },
      data: {
        status: status,
        deletedAt: status === EnumUserStatus.DISABLED ? new Date() : null
      },
      include: { roles: { include: { role: true } } }
    })

    return User.fromPersistence({
      id_user: userUpdated.id_user,
      email: userUpdated.email,
      password: userUpdated.password,
      status: userUpdated.status as EnumUserStatus,
      deletedAt: userUpdated.deletedAt
    })
  }

  async deleteUserById(id_user: string): Promise<User> {
    const userDeleted = await this.prisma.db.user.delete({
      where: {
        id_user
      }
    })

    return User.fromPersistence({
      id_user: userDeleted.id_user,
      email: userDeleted.email,
      password: userDeleted.password,
      status: userDeleted.status as EnumUserStatus,
      deletedAt: userDeleted.deletedAt
    })
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.db.user.findUnique({
      where: { email },
      include: { roles: { include: { role: true } } }
    })

    if (!user) return null
    return User.fromPersistence({
      id_user: user.id_user,
      email: user.email,
      password: user.password,
      status: user.status as EnumUserStatus,
      deletedAt: user.deletedAt,
      roles: user.roles.map(role => role.role.name)
    })
  }

  async changePassword(id_user: string, password: string): Promise<void> {
    await this.prisma.db.user.update({
      where: { id_user },
      data: {
        password: password
      }
    })
  }
}
