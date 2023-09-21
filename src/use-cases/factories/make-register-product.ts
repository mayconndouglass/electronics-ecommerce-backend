import { PrismaProductRepository } from "@/repositories/prisma-product-repository"
import { PrismaColorRepository } from "@/repositories/prisma-color-repository"
import { PrismaProductColorRepository } from "@/repositories/prisma-product-color-repository"
import { RegisterProductUseCase } from "../Product/register-product"
import { PrismaImageRepository } from "@/repositories/prisma-image-repository"
import { PrismaProductImageRepository } from "@/repositories/prisma-product-image-repository"

export const MakeRegisterProduct = () => {
  const productRepository = new PrismaProductRepository()
  const colorRepository = new PrismaColorRepository()
  const productColorRepository = new PrismaProductColorRepository()
  const imageRepository = new PrismaImageRepository()
  const productImageRepository = new PrismaProductImageRepository()

  const registerProduct = new RegisterProductUseCase(
    productRepository,
    colorRepository,
    productColorRepository,
    productImageRepository,
    imageRepository
  )

  return registerProduct
}
