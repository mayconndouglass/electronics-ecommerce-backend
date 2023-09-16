import { MulterRequest, useImageUpload } from "@/hooks/use-image-upload"
import { ExclusiveFieldError } from "@/use-cases/errors/exclusive-field-error"
import { MakeRegisterProduct } from "@/use-cases/factories/make-register-product"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const registerProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.string().regex(/^\$\d+(\.\d{2})?$/),
    promotionalPrice: z.string().regex(/^\$\d+(\.\d{2})?$/).optional(),
    discount: z.string().regex(/^0?([1-9][0-9])$/).optional()
      .transform((value) => Number(value)),
    categoryId: z.string(),
    colors: z.string().optional(),
  }).refine(data => {
    const hasPromotionalPrice = data.promotionalPrice !== undefined
    const hasDiscount = data.discount !== undefined

    if ((hasPromotionalPrice && hasDiscount) || (!hasPromotionalPrice && !hasDiscount)) {
      throw new ExclusiveFieldError()
    }

    if (data.colors) {
      const hexadecimals = JSON.parse(data.colors)
      const validatesHexadecimals = z.array(z.string().regex(/^#[0-9A-Fa-f]+$/))

      validatesHexadecimals.parse(hexadecimals)
    }

    return true
  })

  try {
    const data = registerProductSchema.parse(request.body)
    const [url] = await useImageUpload(request as MulterRequest, "products")

    const registerProductUseCase = MakeRegisterProduct()

    const product = await registerProductUseCase.execute({
      ...data,
      image: url,
      colors: data.colors ? JSON.parse(data.colors) : null
    })

    return reply.status(201).send({ product })
  } catch (err) {
    if (err instanceof ExclusiveFieldError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
