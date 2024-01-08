import { PrismaFavoriteItemRepository } from "@/repositories/prisma-favorite-item-repository"
import { PrismaUserRepository } from "@/repositories/prisma-user-repository"
import { UpdateFavoriteItemsUseCase } from "@/use-cases/Favorites/update-favorite-items"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const updateFavoriteItems = (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const updateFavoriteItemsSchemaBody = z.object({
    items: z.array(z.object({
      id: z.string(),
      name: z.string(),
      price: z.string(),
      imageUrl: z.string()
    }))
  })

  const { items } = updateFavoriteItemsSchemaBody.parse(request.body)

  try {
    const favoriteItemRepository = new PrismaFavoriteItemRepository()
    const userRepository = new PrismaUserRepository()

    const updateFavoriteItems = new UpdateFavoriteItemsUseCase(
      favoriteItemRepository,
      userRepository
    )

    const userId = request.user.sub

    updateFavoriteItems.execute(items, userId)

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}

