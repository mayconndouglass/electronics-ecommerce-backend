import { RegisterProductJsonShema } from "@/schemas/register-product-schema"
import { ExclusiveFieldError } from "@/use-cases/errors/exclusive-field-error"
import { MakeRegisterProduct } from "@/use-cases/factories/make-register-product"
import { FastifyReply, FastifyRequest } from "fastify"

export const registerProductWhoutImageUpload = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerProductSchema = RegisterProductJsonShema()

  try {
    const data = registerProductSchema.parse(request.body)

    const registerProductUseCase = MakeRegisterProduct()

    const images = data.images.map(image => image.url)
    const colors = JSON.stringify(data.colors?.map(color => color.hexadecimal))

    const product = await registerProductUseCase.execute({
      name: data.name,
      description: data.description,
      price: data.price,
      promotionalPrice: data.promotional_price,
      discount: data.discount ?? null,
      categoryId: data.category_id,
      images: images,
      colors: colors ? JSON.parse(colors) : null
    })

    return reply.status(201).send({ product })
  } catch (err) {
    if (err instanceof ExclusiveFieldError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
