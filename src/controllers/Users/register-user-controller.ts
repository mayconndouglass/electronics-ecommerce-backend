import { PrismaUserRepository } from "@/repositories/prisma-user-repository"
import { RegisterUserUseCase } from "@/use-cases/Users/register-user"
import { EmailAlreadyExistsError } from "@/use-cases/errors/email-already-exist-error"
import { MulterRequest, handleImageUpload } from "@/utils/handle-image-upload"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
  })

  const data = registerUserSchema.parse(request.body)
  const imageUrl = await handleImageUpload.uploadSingleImage(request as MulterRequest, "users")

  try {
    const userRepository = new PrismaUserRepository()
    const userUseCase = new RegisterUserUseCase(userRepository)

    await userUseCase.execute({ ...data, image: imageUrl })
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
