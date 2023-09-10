import { RegisterProductDTO } from "@/dtos/RegisterProductDTO"
import { ProductRepository } from "./interfaces/product-repository"
import { prisma } from "@/lib/prisma"

export class PrismaProductRepository implements ProductRepository {
  async create(data: RegisterProductDTO) {
    const product = await prisma.product.create({ data })

    return product
  }
}
