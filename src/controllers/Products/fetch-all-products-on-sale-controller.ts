import { PrismaProductRepository } from "@/repositories/prisma-product-repository"
import { FetchAllProductsOnSaleUseCase } from "@/use-cases/Product/fetch-all-products-on-sale"

import { FastifyReply, FastifyRequest } from "fastify"

export const fetchAllProductsOnSale = async (request: FastifyRequest, reply: FastifyReply) => {
  const productRepository = new PrismaProductRepository()
  const fetchAllOnSaleUseCase = new FetchAllProductsOnSaleUseCase(productRepository)

  const productsOnSale = await fetchAllOnSaleUseCase.execute()

  return reply.status(200).send({ productsOnSale })
}
