import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { PrismaCartItemRepository } from "../../repositories/prisma-cart-item-repository"
import { RemoveItemFromCartUseCase } from "../../use-cases/Cart/remove-item-from-cart"
import { ResourceNotFoundError } from "../../use-cases/errors/resource-not-found-error"
import { PrismaCartRepository } from "@/repositories/prisma-cart-repository"
import { NotAllowedError } from "@/use-cases/errors/not-allowed-error"

export const RemoveItemFromCart = async (
  request: FastifyRequest, reply: FastifyReply
) => {
  const removeItemFromCartParamSchema = z.object({
    id: z.string(),
  })

  const { id: itemId, } = removeItemFromCartParamSchema.parse(request.params)
  const userId = request.user.sub

  try {
    const cartItemRepository = new PrismaCartItemRepository()
    const cartRepository = new PrismaCartRepository()
    const removeItemFromCartUseCase = new RemoveItemFromCartUseCase(
      cartItemRepository,
      cartRepository
    )

    await removeItemFromCartUseCase.execute(itemId, userId)

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof NotAllowedError) {
      return reply.status(403).send(err.message)
    }

    throw err
  }
}
