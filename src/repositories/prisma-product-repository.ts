import { prisma } from "@/lib/prisma"
import { ProductRepository } from "./interfaces/product-repository"
import { Prisma } from "@prisma/client"

export class PrismaProductRepository implements ProductRepository {
  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = await prisma.product.create({ data })

    return product
  }
}
