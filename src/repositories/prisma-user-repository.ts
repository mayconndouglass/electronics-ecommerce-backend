import { prisma } from "@/lib/prisma"
import { RegisterUserDTO } from "@/dtos/RegisterUserDTO"
import { UserRepository } from "./interfaces/user-repository"

export class PrismaUserRepository implements UserRepository {
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
