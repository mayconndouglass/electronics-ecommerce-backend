import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"

import { PrismaCartRepository } from "@/repositories/prisma-cart-repository"
import { FetchAllItemsFromCartUseCase } from "@/use-cases/Cart/fetch-all-items-from-cart"
import { CartDoesNotExist } from "@/use-cases/errors/cart-does-not-exist-error"

export const FetchAllItemsFromCart = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const fetchAllItemsQuerySchema = z.object({
    id: z.string()
  })

  const { id } = fetchAllItemsQuerySchema.parse(request.params)

  try {
    const CartRepository = new PrismaCartRepository()
    const fetchAllItemsFromCartUseCase = new FetchAllItemsFromCartUseCase(
      CartRepository
    )

    const items = await fetchAllItemsFromCartUseCase.execute(id)

    return reply.status(200).send(items)
  } catch (err) {
    if (err instanceof CartDoesNotExist) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
