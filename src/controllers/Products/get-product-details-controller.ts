import { PrismaProductRepository } from "@/repositories/prisma-product-repository"
import { GetProductDetails } from "@/use-cases/Product/get-product-details"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const getProductController = async (request: FastifyRequest, reply: FastifyReply) => {
  const getProductSchema = z.object({
    id: z.string()
  })

  const { id } = getProductSchema.parse(request.params)

  try {
    const productRepository = new PrismaProductRepository()
    const getProduct = new GetProductDetails(productRepository)

    const product = await getProduct.execute(id)

    reply.status(200).send({ product })
  }
  catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
