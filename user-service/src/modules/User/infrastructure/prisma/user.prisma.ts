import { Injectable } from '@nestjs/common'
import { User } from 'core/entities/User'
import { EnumUserStatus } from 'core/enum/user.enum'
import { IUserRepositorie } from 'core/repositories/user.repositorie'
import { PrismaService } from 'shared/configs/prisma/prisma.service'

@Injectable()
export class UserPrisma implements IUserRepositorie {
  constructor(private readonly prisma: PrismaService) {}

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
}
