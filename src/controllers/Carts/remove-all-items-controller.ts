import { FastifyReply, FastifyRequest } from "fastify"

import { RemoveAllItemsUseCase } from "@/use-cases/Cart/remove-all-items"
import { PrismaCartItemRepository } from "@/repositories/prisma-cart-item-repository"
import { PrismaCartRepository } from "@/repositories/prisma-cart-repository"

import { CartDoesNotExist } from "@/use-cases/errors/cart-does-not-exist-error"

export const RemoveAllItems = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {

  const userId = request.user.sub

  try {
    const cartRepository = new PrismaCartRepository()
    const cartItemRepository = new PrismaCartItemRepository()
    const removeAllItems = new RemoveAllItemsUseCase(
      cartRepository,
      cartItemRepository
    )

    await removeAllItems.execute(userId)

  } catch (err) {
    if (err instanceof CartDoesNotExist) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}
