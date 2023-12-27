import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaCartRepository } from "@/repositories/prisma-cart-repository"
import { PrismaCartItemRepository } from "@/repositories/prisma-cart-item-repository"
import { UpdateCartItemsUseCase } from "@/use-cases/Cart/update-cart-items"

export const UpdateCartItems = (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const updateCartItemsSchemaBody = z.object({
    items: z.array(z.object({
      id: z.string(),
      name: z.string(),
      price: z.string(),
      quantity: z.number(),
      imageUrl: z.string()
    }))
  })

  const { items } = updateCartItemsSchemaBody.parse(request.body)
  const userId = request.user.sub

  const cartItemRepository = new PrismaCartItemRepository()
  const cartRepository = new PrismaCartRepository()
  const updateCartItemUseCase = new UpdateCartItemsUseCase(
    cartItemRepository,
    cartRepository
  )

  updateCartItemUseCase.execute(items, userId)

  return reply.status(200).send()
}
