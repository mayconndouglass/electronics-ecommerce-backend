import { ExclusiveFieldError } from "@/use-cases/errors/exclusive-field-error"
import { z } from "zod"

export const RegisterProductSchema = () => {
  return z.object({
    name: z.string(),
    description: z.string(),
    price: z.string().regex(/^R\$\s?\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/),
    promotionalPrice: z.string().regex(/^R\$\s?\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/).optional(),
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

export const RegisterProductJsonShema = () => {
  return z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    created_at: z.string(),
    price: z.string(),
    promotional_price: z.string().optional(),
    discount: z.number().optional(),
    category_id: z.string(),
    category_name: z.string(),
    colors: z.array(z.object({
      id: z.string(),
      hexadecimal: z.string()
    })).optional(),
    images: z.array(z.object({
      id: z.string(),
      url: z.string()
    }))
  })
}
