import { MulterRequest, handleImageUpload } from "@/utils/handle-image-upload"
import { RegisterProductSchema } from "@/schemas/register-product-schema"
import { ExclusiveFieldError } from "@/use-cases/errors/exclusive-field-error"
import { MakeRegisterProduct } from "@/use-cases/factories/make-register-product"
import { FastifyReply, FastifyRequest } from "fastify"

export const registerProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerProductSchema = RegisterProductSchema()

  try {
    const data = registerProductSchema.parse(request.body)
    const urls = await handleImageUpload.
      uploadMultipleImages(request as MulterRequest, "products")

    const registerProductUseCase = MakeRegisterProduct()

    const product = await registerProductUseCase.execute({
      ...data,
      images: urls,
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
