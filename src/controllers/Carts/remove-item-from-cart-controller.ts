import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { PrismaCartItemRepository } from "../../repositories/prisma-cart-item-repository"
import { RemoveItemFromCartUseCase } from "../../use-cases/Cart/remove-item-from-cart"
import { ResourceNotFoundError } from "../../use-cases/errors/resource-not-found-error"

export const RemoveItemFromCart = async (request: FastifyRequest, reply: FastifyReply) => {
  const removeItemFromCartBodySchema = z.object({
    id: z.string()
  })

  const { id: itemId } = await removeItemFromCartBodySchema.parse(request.params)

  try {
    const cartItemRepository = new PrismaCartItemRepository()
    const removeAllItems = new RemoveItemFromCartUseCase(cartItemRepository)

    await removeAllItems.execute(itemId)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send(err.message)
    }

    throw err
  }

  return reply.status(204).send()
}
