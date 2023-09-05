import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaCategoryRepository } from "@/repositories/interfaces/prisma-category-repository"
import { RegisterCategoryUseCase } from "@/use-cases/Categories/register-category"

export const registerCategory = (request: FastifyRequest, reply: FastifyReply) => {
  const registerCategoryBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    image: z.string()
  })

  const data = registerCategoryBodySchema.parse(request.body)

  try {
    const categoryRepository = new PrismaCategoryRepository()
    const categoryUseCase = new RegisterCategoryUseCase(categoryRepository)

    categoryUseCase.execute({ ...data })
  }
}
