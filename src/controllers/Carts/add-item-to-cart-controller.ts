import { PrismaCartItemRepository } from "@/repositories/prisma-cart-item-repository"
import { PrismaCartRepository } from "@/repositories/prisma-cart-repository"
import { AddItemToCartUseCase } from "@/use-cases/Cart/add-item-to-cart"
import { UserAlreadyHasAnOpenCartError } from "@/use-cases/errors/user-already-has-an-open-cart-error"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const AddItemToCart = async (request: FastifyRequest, reply: FastifyReply) => {
  const addItemToCartBodySchema = z.object({
    cart_id: z.string().optional(),
    product_id: z.string(),
    user_id: z.string(),
    quantity: z.number(),
    price: z.string()
  })

  const data = addItemToCartBodySchema.parse(request.body)

  try {
    const cartRepository = new PrismaCartRepository()
    const cartItemRepository = new PrismaCartItemRepository()
    const addItemToCartUseCase = new AddItemToCartUseCase(
      cartRepository,
      cartItemRepository
    )

    const item = await addItemToCartUseCase.execute(data)

    return reply.status(200).send({ item })
  } catch (err) {
    if (err instanceof UserAlreadyHasAnOpenCartError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
