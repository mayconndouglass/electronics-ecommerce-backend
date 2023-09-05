import { RegisterCategoryDTO } from "@/dtos/RegisterCategoryDTO"
import { CategoryRepository } from "@/repositories/interfaces/category-repository"
import { CategoryAlreadyExistsError } from "../errors/category-already-exist-error"

export class RegisterCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) { }

  async execute(data: RegisterCategoryDTO) {
    const categoryWithSameName = await this.categoryRepository.findByName(data.name)

    if (categoryWithSameName) {
      throw new CategoryAlreadyExistsError()
    }

    const category = await this.categoryRepository.create({ ...data })

    return {
      category
    }
  }
}
