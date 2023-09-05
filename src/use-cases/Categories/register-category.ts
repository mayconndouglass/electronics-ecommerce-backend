import { RegisterCategoryDTO } from "@/dtos/RegisterCategoryDTO"
import { CategoryRepository } from "@/repositories/interfaces/category-repository"

export class RegisterCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) { }

  async execute(data: RegisterCategoryDTO) {
    const category = this.categoryRepository.create({ ...data })

    return {
      category
    }
  }
}
