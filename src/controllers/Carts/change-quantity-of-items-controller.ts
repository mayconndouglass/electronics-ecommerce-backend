import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { ChangeQuantityOfItemsUseCase } from "@/use-cases/Cart/change-quantity-of-items"

import { PrismaCartItemRepository } from "@/repositories/prisma-cart-item-repository"
import { PrismaProductRepository } from "@/repositories/prisma-product-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"

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
    const productRepository = new PrismaProductRepository()

    const changeQuantityOfItems = new ChangeQuantityOfItemsUseCase(
      cartItemRepository,
      productRepository
    )

    const userId = request.user.sub

    const { item } = await changeQuantityOfItems.execute(
      userId,
      itemId,
      quantity
    )

    return reply.status(200).send({ item })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
