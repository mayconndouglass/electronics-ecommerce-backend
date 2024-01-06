import { FastifyReply, FastifyRequest } from "fastify"

import { FetchItemsUseCase } from "@/use-cases/Favorites/fetch-items"

import { PrismaFavoriteItemRepository } from "@/repositories/prisma-favorite-item-repository"
import { PrismaUserRepository } from "@/repositories/prisma-user-repository"

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"

export const FetchItemsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const favoriteItemRepository = new PrismaFavoriteItemRepository()
    const userRepository = new PrismaUserRepository()

    const fetchItems = new FetchItemsUseCase(
      favoriteItemRepository,
      userRepository
    )

    const userId = request.user.sub
    const items = await fetchItems.execute(userId)

    return reply.status(200).send({ items })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
