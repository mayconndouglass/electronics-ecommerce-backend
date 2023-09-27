import { PrismaProductRepository } from "@/repositories/prisma-product-repository"
import { FetchAllProductsUseCase } from "@/use-cases/Product/fetch-all-products"
import { FastifyReply, FastifyRequest } from "fastify"

export const fetchAllProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  const productRepository = new PrismaProductRepository()
  const fetchAllUseCase = new FetchAllProductsUseCase(productRepository)

  const products = await fetchAllUseCase.execute()

  return reply.status(200).send({ products })
}
