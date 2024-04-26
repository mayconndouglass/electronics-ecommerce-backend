import { NotAllowedError } from "@/use-cases/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { MakeRegisterOrder } from "@/use-cases/factories/make-register-order"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const RegisterOrder = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  //TODO: Melhorar essas validações quando já estiver funcionando a lógica
  const registerOrderSchema = z.object({
    itemId: z.string(),
    status: z.string(),
    shippingMethod: z.string(),
    shippingFee: z.string(),
    paymentMethod: z.string(),
    totalPayable: z.string(),

    cpf: z.string().min(11),
    birthdate: z.date(),
    typePerson: z.string(),

    zipCode: z.string().max(9),
    street: z.string(),
    houseNumber: z.number(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    complement: z.string(),
    phones: z.array(z.number())
  })

  const data = registerOrderSchema.parse(request.body)
  console.log(data)
  try {
    const userId = request.user.sub
    const registerOrder = MakeRegisterOrder()

    registerOrder.execute({ userId, ...data })
  } catch (err) {
    console.log("EEEEEEEEEEEEEEEEROOOOOOOOOOOOOOOR", err)
    if (err instanceof NotAllowedError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
