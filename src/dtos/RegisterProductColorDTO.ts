import { Prisma } from "@prisma/client"

export class RegisterProductColorDTO implements Prisma.ProductColorUncheckedCreateInput {
  color_id: string
  product_id: string
}
