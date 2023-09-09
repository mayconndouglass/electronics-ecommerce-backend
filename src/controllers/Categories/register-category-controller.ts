import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { PrismaCategoryRepository } from "@/repositories/interfaces/prisma-category-repository"
import { RegisterCategoryUseCase } from "@/use-cases/Categories/register-category"
import { CategoryAlreadyExistsError } from "@/use-cases/errors/category-already-exist-error"
import { MulterRequest, useImageUpload } from "@/hooks/use-image-upload"

/* import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { getstorage } from "@/config/firebase-config" */

export const registerCategory = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerCategoryBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
  })

  const data = registerCategoryBodySchema.parse(request.body)
  const [url] = await useImageUpload(request as MulterRequest)

  /* const reqFile = (request as MulterRequest).file
  const storageRef = ref(getstorage, reqFile.originalname)
  uploadBytes(storageRef, reqFile.buffer)
  const url = await getDownloadURL(storageRef) */

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

  return reply.status(201).send()
}
