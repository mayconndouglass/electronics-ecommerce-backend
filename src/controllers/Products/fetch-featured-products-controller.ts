import { PrismaProductRepository } from "@/repositories/prisma-product-repository"
import { FetchFeaturedProducts } from "@/use-cases/Product/fetch-featured-products"

import { FastifyReply, FastifyRequest } from "fastify"

export const fetchFeaturedProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  const productRepository = new PrismaProductRepository()
  const fetchFeaturedProducts = new FetchFeaturedProducts(productRepository)

  const featuredProducts = await fetchFeaturedProducts.execute()

  return reply.status(200).send({ featuredProducts })
}
