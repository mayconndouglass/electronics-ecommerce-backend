import { FastifyReply, FastifyRequest } from "fastify"

import { FetchAllColors } from "@/use-cases/colors/fetch-all-colors"
import { PrismaColorRepository } from "@/repositories/prisma-color-repository"

export const fetchAllColors = async (request: FastifyRequest, reply: FastifyReply) => {
  const colorsRepository = new PrismaColorRepository()
  const fetchAllColorsUseCase = new FetchAllColors(colorsRepository)
  
  const colors = await fetchAllColorsUseCase.execute()

  return reply.status(200).send(colors)
}
