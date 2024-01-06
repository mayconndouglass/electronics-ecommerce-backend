import { FastifyReply, FastifyRequest } from "fastify"

import { RemoveItemFromFavoritesUseCase } from "@/use-cases/Favorites/remove-item-from-favorites"

import { PrismaFavoriteItemRepository } from "@/repositories/prisma-favorite-item-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"

import { z } from "zod"

export const removeItemFromFavorites = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const removeItemFromFavoritesParamsSchema = z.object({
    id: z.string()
  })

  const {
    id: productId
  } = removeItemFromFavoritesParamsSchema.parse(request.params)

  try {
    const favoriteRepository = new PrismaFavoriteItemRepository()
    const removeItemFromFavorites = new RemoveItemFromFavoritesUseCase(
      favoriteRepository
    )

    const userId = request.user.sub

    await removeItemFromFavorites.execute({ userId, productId })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
