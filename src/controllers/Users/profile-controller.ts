import { FastifyReply, FastifyRequest } from "fastify"
import { GetUserProfileUseCase } from "@/use-cases/Users/get-user-profile"
import { PrismaUserRepository } from "@/repositories/prisma-user-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userRepository = new PrismaUserRepository()
    const getUserProfile = new GetUserProfileUseCase(userRepository)

    const userToken = request.user.sub

    const { user } = await getUserProfile.execute(userToken)

    return reply.status(200).send({ ...user, password_hash: undefined })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
