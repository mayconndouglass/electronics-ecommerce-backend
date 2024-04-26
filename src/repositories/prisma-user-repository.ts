import { prisma } from "@/lib/prisma"
import { RegisterUserDTO } from "@/dtos/RegisterUserDTO"
import { UserRepository } from "./interfaces/user-repository"
import { UpdateUserDataProps } from "@/types/update-user-data"

export class PrismaUserRepository implements UserRepository {
  async updateData(data: UpdateUserDataProps) {
    const user = await prisma.user.findUnique({ where: { id: data.id } })
    await prisma.user.update({
      where: {
        id: data.id
      },
      data: {
        cpf: data.cpf ?? user?.cpf,
        birthdate: data.birthdate ?? user?.birthdate,
        person_type: data.personType ?? user?.person_type
      }
    })
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } })

    return user
  }

  async create(data: RegisterUserDTO) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }
}
