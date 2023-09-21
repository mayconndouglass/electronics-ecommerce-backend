import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { PrismaCategoryRepository } from "@/repositories/prisma-category-repository"
import { RegisterCategoryUseCase } from "@/use-cases/Categories/register-category"
import { CategoryAlreadyExistsError } from "@/use-cases/errors/category-already-exist-error"
import { MulterRequest, handleImageUpload } from "@/utils/handle-image-upload"

export const registerCategory = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerCategoryBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
  })

  const data = registerCategoryBodySchema.parse(request.body)
  const url = await handleImageUpload.
    uploadSingleImage(request as MulterRequest, "categories")

  try {
    const categoryRepository = new PrismaCategoryRepository()
    const categoryUseCase = new RegisterCategoryUseCase(categoryRepository)

    await categoryUseCase.execute({ ...data, image: url })
  } catch (err) {
    if (err instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
  if (data === undefined) {
    console.log("olá")
  }
  return reply.status(201).send()
}
