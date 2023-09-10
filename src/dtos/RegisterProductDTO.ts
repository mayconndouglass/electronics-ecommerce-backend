import { Prisma } from "@prisma/client"

export class RegisterProductDTO implements Prisma.ProductUncheckedCreateInput {
  id?: string | undefined
  name: string
  description: string
  image: string
  created_at?: string | Date | undefined
  price: string
  promotional_price?: string | null | undefined
  discount?: string | null | undefined
  category_id: string
}
