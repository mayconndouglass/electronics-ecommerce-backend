import { PrismaProductRepository } from "@/repositories/prisma-product-repository"
import { PrismaColorRepository } from "@/repositories/prisma-color-repository"
import { PrismaProductColorRepository } from "@/repositories/prisma-product-color-repository"
import { RegisterProductUseCase } from "../Product/register-product"

export const MakeRegisterProduct = () => {
  const productRepository = new PrismaProductRepository()
  const colorRepository = new PrismaColorRepository()
  const productColorRepository = new PrismaProductColorRepository()

  const registerProduct = new RegisterProductUseCase(
    productRepository,
    colorRepository,
    productColorRepository
  )

  return registerProduct
}
