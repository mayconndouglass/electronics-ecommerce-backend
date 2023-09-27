import { Prisma } from "@prisma/client"
import { ProductRepository } from "./interfaces/product-repository"
import { prisma } from "@/lib/prisma"

export class PrismaProductRepository implements ProductRepository {
  async fetchAllProducts() {
    const products = await prisma.product.findMany()

    return products
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = await prisma.product.create({ data })

    return product
  }
}
