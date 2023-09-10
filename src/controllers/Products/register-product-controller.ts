import { MulterRequest, useImageUpload } from "@/hooks/use-image-upload"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const registerProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.string().regex(/^\$\d+(\.\d{2})?$/),
    promotionalPrice: z.string().regex(/^\$\d+(\.\d{2})?$/).optional(),
    discount: z.number().int().min(0).max(100).optional(),
    categoryId: z.string(),
    colors: z.array(
      z.object({
        hexadecimal: z.string().regex(/^#[0-9A-Fa-f]+$/),
      })
    ),
  }).refine(data => {
    const hasPromotionalPrice = data.promotionalPrice !== undefined
    const hasDiscount = data.discount !== undefined

    if ((hasPromotionalPrice && hasDiscount) || (!hasPromotionalPrice && !hasDiscount)) {
      throw new Error("Send only one of the fields: promotionalPrice or discount.")
    }

    return true
  })

  const data = registerProductSchema.parse(request.body)
  const [url] = await useImageUpload(request as MulterRequest)

  try {
    const productRepository = new PrismaProductRepository()
    const productUseCase = new RegisterProductUseCase(productRepository)
  } catch (err) {

  }

  return reply.status(201).send()
}
