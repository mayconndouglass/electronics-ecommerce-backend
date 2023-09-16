import { ExclusiveFieldError } from "@/use-cases/errors/exclusive-field-error"
import { z } from "zod"

export const RegisterProductSchema = () => {
  return z.object({
    name: z.string(),
    description: z.string(),
    price: z.string().regex(/^R\$\d+\.\d{2}$/),
    promotionalPrice: z.string().regex(/^R\$\d+\.\d{2}$/).optional(),
    discount: z.string().regex(/^0?([1-9][0-9])$/).optional()
      .transform((value) => Number(value)),
    categoryId: z.string(),
    colors: z.string().optional(),
  }).refine(data => {

    if (data.promotionalPrice && data.discount) {
      throw new ExclusiveFieldError()
    }

    if (data.colors) {
      const hexadecimals = JSON.parse(data.colors)
      const validatesHexadecimals = z.array(z.string().regex(/^#[0-9A-Fa-f]+$/))

      validatesHexadecimals.parse(hexadecimals)
    }

    return true
  })
}
