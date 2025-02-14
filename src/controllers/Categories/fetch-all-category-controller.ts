import { PrismaCategoryRepository } from "@/repositories/prisma-category-repository"
import { FetchAllCategories } from "@/use-cases/Categories/fetch-all-categories"
import { FastifyReply } from "fastify"

export const fetchAllCategories = async (reply: FastifyReply) => {
  const categoryRepository = new PrismaCategoryRepository()
  const fetchAllUseCase = new FetchAllCategories(categoryRepository)

  const categories = await fetchAllUseCase.execute()

  return reply.status(200).send(categories)
}
