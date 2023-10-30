import { PrismaUserRepository } from "@/repositories/prisma-user-repository"
import { AuthenticateUserUseCase } from "@/use-cases/Users/authenticate-user"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const AuthenticateUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const authenticadeBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),//TODO: PENSAR SOBRE A NECESSIDADE DE DEIXAR ESSA SENHA MAIS COMPLEXA
  })

  const { email, password } = authenticadeBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUserRepository()
    const authenticateUser = new AuthenticateUserUseCase(userRepository)

    const { user } = await authenticateUser.execute({
      email,
      password
    })

    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id
      }
    })

    return reply.status(200).send({ token })

  } catch (err) {

    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
