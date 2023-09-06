import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { PrismaCategoryRepository } from "@/repositories/interfaces/prisma-category-repository"
import { RegisterCategoryUseCase } from "@/use-cases/Categories/register-category"
import { CategoryAlreadyExistsError } from "@/use-cases/errors/category-already-exist-error"

interface MulterRequest extends FastifyRequest {
  file: {
    filename: string
  }
}

export const registerCategory = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerCategoryBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
  })

  const data = registerCategoryBodySchema.parse(request.body)
  const image = (request as MulterRequest).file.filename

  try {
    const categoryRepository = new PrismaCategoryRepository()
    const categoryUseCase = new RegisterCategoryUseCase(categoryRepository)

    await categoryUseCase.execute({ ...data, image })
  } catch (err) {
    if (err instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
