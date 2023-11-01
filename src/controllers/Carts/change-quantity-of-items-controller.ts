import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { PrismaCartItemRepository } from "@/repositories/prisma-cart-item-repository"
import { ChangeQuantityOfItemsUseCase } from "@/use-cases/Cart/change-quantity-of-items"

export const ChangeQuantityOfItems = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const changeQuantityOfItemsBodySchema = z.object({
    itemId: z.string(),
    quantity: z.number()
  })

  const { itemId, quantity } = changeQuantityOfItemsBodySchema
    .parse(request.body)

  try {
    const cartItemRepository = new PrismaCartItemRepository()
    const changeQuantityOfItems =
      new ChangeQuantityOfItemsUseCase(cartItemRepository)

    const { item } = await changeQuantityOfItems.execute(itemId, quantity)

    return reply.status(200).send({ item })
  } catch (err) {
    return reply.status(500).send({ messa: err })
  }
}
