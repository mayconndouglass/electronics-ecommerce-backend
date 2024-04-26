import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { RegisterUserUseCase } from "@/use-cases/Users/register-user"
import { PrismaUserRepository } from "@/repositories/prisma-user-repository"
import { EmailAlreadyExistsError } from "@/use-cases/errors/email-already-exist-error"

export const registerUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const registerUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const data = registerUserSchema.parse(request.body)

  try {
    const userRepository = new PrismaUserRepository()
    const userUseCase = new RegisterUserUseCase(userRepository)

    await userUseCase.execute(data)
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
