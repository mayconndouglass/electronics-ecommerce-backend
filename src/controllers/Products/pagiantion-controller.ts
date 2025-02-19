import { FastifyReply, FastifyRequest } from "fastify"

import { PrismaProductRepository } from "@/repositories/prisma-product-repository"
import { ProductPagination } from "@/use-cases/Product/product-pagination"

import { PaginationProductSchema } from "@/schemas/pagination-product-schema"

export const paginationController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const paginationSchema = PaginationProductSchema()
  const {
    category,
    page,
    limit,
    color,
    sortby,
    maxprice
  } = paginationSchema.parse(request.query)

  const productRepository = new PrismaProductRepository()
  const productPaginationUseCase = new ProductPagination(productRepository)

  const productsPaginated = await productPaginationUseCase.execute({
    page,
    limit,
    category,
    color,
    orderBy: sortby,
    maxPrice: maxprice
  })
    

  return reply.status(200).send(productsPaginated)
}    
