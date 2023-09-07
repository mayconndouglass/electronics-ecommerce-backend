import { CategoryRepository } from "@/repositories/interfaces/category-repository"

export class FetchAllCategories {
  constructor(private categoryRepository: CategoryRepository) { }

  async execute() {
    const categories = await this.categoryRepository.fetchAllCategories()

    return categories
  }
}
