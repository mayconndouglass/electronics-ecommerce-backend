import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { PrismaCategoryRepository } from "@/repositories/interfaces/prisma-category-repository"
import { RegisterCategoryUseCase } from "@/use-cases/Categories/register-category"
import { CategoryAlreadyExistsError } from "@/use-cases/errors/category-already-exist-error"

export const registerCategory = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerCategoryBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    image: z.string()
  })

  const data = registerCategoryBodySchema.parse(request.body)

  try {
    const categoryRepository = new PrismaCategoryRepository()
    const categoryUseCase = new RegisterCategoryUseCase(categoryRepository)

    await categoryUseCase.execute({ ...data })
  } catch (err) {
    if (err instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
