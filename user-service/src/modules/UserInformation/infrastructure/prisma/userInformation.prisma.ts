import { Injectable } from '@nestjs/common'
import { UserInformation } from 'core/entities/UserInformation'
import { EnumGender } from 'core/enum/userInformation.enum'
import { IUserInformationRepositorie } from 'core/repositories/userInformation.repositorie'
import { PrismaService } from 'shared/configs/prisma/prisma.service'

@Injectable()
export class UserInformationPrisma implements IUserInformationRepositorie {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserInformation): Promise<UserInformation> {
    const userInformation = await this.prisma.db.userInformation.create({
      data: {
        id_user: data.getIdUser,
        nick_name: data.getNickName,
        age: data.getAge,
        gender: data.getGender
      }
    })

    return UserInformation.fromPersistence({
      id_user_information: userInformation.id_user_information,
      id_user: userInformation.id_user,
      nick_name: userInformation.nick_name,
      age: userInformation.age,
      gender: userInformation.gender as EnumGender
    })
  }

  async findNickName(nick_name: string): Promise<boolean> {
    const userInformationExists = await this.prisma.db.userInformation.findUnique({
      where: {
        nick_name
      }
    })
    return !!userInformationExists
  }

  async findUserInformationByIdUser(id_user: string): Promise<UserInformation | null> {
    const userInformationExists = await this.prisma.db.userInformation.findUnique({
      where: {
        id_user
      }
    })

    if (!userInformationExists) return null
    return UserInformation.fromPersistence({
      id_user_information: userInformationExists.id_user_information,
      id_user: userInformationExists.id_user,
      nick_name: userInformationExists.nick_name,
      age: userInformationExists.age,
      gender: userInformationExists.gender as EnumGender
    })
  }
}
