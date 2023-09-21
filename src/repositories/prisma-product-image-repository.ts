import { RegisterProductImageDTO } from "@/dtos/RegisterProductImageDTO"
import { ProductImageRepository } from "./interfaces/product-image-repository"
import { prisma } from "@/lib/prisma"

export class PrismaProductImageRepository implements ProductImageRepository {
  async create(data: RegisterProductImageDTO) {
    await prisma.productImage.create({ data })
  }
}
