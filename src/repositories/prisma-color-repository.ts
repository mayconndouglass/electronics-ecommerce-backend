import { prisma } from "@/lib/prisma"
import { ColorRepository } from "./interfaces/color-repository"

export class PrismaColorRepository implements ColorRepository {
  async create(hexadecimal: string) {
    const color = await prisma.color.create({
      data: {
        hexadecimal
      }
    })

    return color
  }

  async findByHexadecimal(hexadecimal: string) {
    const color = await prisma.color.findUnique({
      where: {
        hexadecimal
      }
    })

    return color
  }
}
