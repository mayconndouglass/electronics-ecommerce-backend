import { RegisterCategoryDTO } from "@/dtos/RegisterCategoryDTO"
import { CategoryRepository } from "./interfaces/category-repository"
import { prisma } from "@/lib/prisma"

export class PrismaCategoryRepository implements CategoryRepository {
  async fetchAllCategories() {
    const categories = await prisma.category.findMany()

    return categories
  }

  async findByName(name: string) {
    const category = await prisma.category.findUnique({
      where: {
        name,
      }
    })

    return category
  }

  async create(data: RegisterCategoryDTO) {
    const category = await prisma.category.create({ data })

    return category
  }
}
