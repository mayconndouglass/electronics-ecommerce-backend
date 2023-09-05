import { RegisterCategoryDTO } from "@/dtos/RegisterCategoryDTO"
import { Category } from "@prisma/client"

export interface CategoryRepository {
  create(data: RegisterCategoryDTO): Promise<Category>
  findByName(name: string): Promise<Category | null>
}
