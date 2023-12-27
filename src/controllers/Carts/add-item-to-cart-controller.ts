import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { NotAllowedError } from "@/use-cases/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { MakeAddItemToCart } from "@/use-cases/factories/make-add-item-to-cart"

export const AddItemToCart = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const addItemToCartBodySchema = z.object({
    productId: z.string(),
    quantity: z.number(),
    price: z.string()
  })

  const data = addItemToCartBodySchema.parse(request.body)

  try {
    const addItemToCartUseCase = MakeAddItemToCart()

    const user = request.user.sub

    const item = await addItemToCartUseCase.execute({ ...data, userId: user })

    return reply.status(200).send(item)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof NotAllowedError) {
      reply.status(403).send({ message: err.message })
    }

    throw err
  }
}
