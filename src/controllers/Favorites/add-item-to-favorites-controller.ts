import { FastifyReply, FastifyRequest } from "fastify"

import { MakeAddItemToFavorites } from "@/use-cases/factories/make-add-item-to-favorites"

import { NotAllowedError } from "@/use-cases/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"

import { z } from "zod"

export const addItemToFavorites = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const addItemToFavoritesSchema = z.object({
    productId: z.string()
  })

  const { productId } = addItemToFavoritesSchema.parse(request.body)

  try {
    const addItemToFavorites = MakeAddItemToFavorites()

    const userId = request.user.sub

    const item = await addItemToFavorites.execute({ userId, productId })

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
