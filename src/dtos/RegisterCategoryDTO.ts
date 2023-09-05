import { Prisma } from "@prisma/client"

export class RegisterCategoryDTO implements Prisma.CategoryCreateInput {
  id?: string | undefined
  name: string
  description?: string | null | undefined
  image: string
}
