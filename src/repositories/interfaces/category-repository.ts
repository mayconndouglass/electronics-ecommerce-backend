import { Category, Prisma } from "@prisma/client"

export interface CategoryRepository {
  create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category>
}
