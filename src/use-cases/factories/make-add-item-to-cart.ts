import { PrismaCartItemRepository } from "@/repositories/prisma-cart-item-repository"
import { PrismaCartRepository } from "@/repositories/prisma-cart-repository"
import { PrismaUserRepository } from "@/repositories/prisma-user-repository"
import { AddItemToCartUseCase } from "../Cart/add-item-to-cart"

export const MakeAddItemToCart = () => {
  const cartRepository = new PrismaCartRepository()
  const cartItemRepository = new PrismaCartItemRepository()
  const userRepository = new PrismaUserRepository()

  const addItemToCartUseCase = new AddItemToCartUseCase(
    cartRepository,
    cartItemRepository,
    userRepository
  )

  return addItemToCartUseCase
}
