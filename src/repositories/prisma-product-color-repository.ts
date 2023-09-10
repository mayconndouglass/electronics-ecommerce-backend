import { RegisterProductColorDTO } from "@/dtos/RegisterProductColorDTO"
import { ProductColorRepository } from "./interfaces/product-color-repository"
import { prisma } from "@/lib/prisma"

export class PrismaProductColorRepository implements ProductColorRepository {
  async create(data: RegisterProductColorDTO) {
    const productColor = await prisma.productColor.create({ data })

    return productColor
  }
}
