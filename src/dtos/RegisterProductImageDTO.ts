import { Prisma } from "@prisma/client"

export class RegisterProductImageDTO implements Prisma.ProductImageUncheckedCreateInput {
  image_id: string
  product_id: string
}
