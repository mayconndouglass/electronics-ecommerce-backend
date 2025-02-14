import { prisma } from "@/lib/prisma"
import { ColorRepository } from "./interfaces/color-repository"
import { Color } from "@prisma/client"

export class PrismaColorRepository implements ColorRepository {
  async fetchAllColors(): Promise<Color[]> {
    const colors = await prisma.color.findMany()

    return colors
  }

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
