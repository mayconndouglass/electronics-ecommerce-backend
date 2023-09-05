import { CategoryRepository } from "@/repositories/interfaces/category-repository"

interface RegisterCategoryUseCaseRequest {
  name: string
  description?: string
  image: string
}

export class RegisterCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) { }

  async execute(data: RegisterCategoryUseCaseRequest) {
    const category = this.categoryRepository.create({ ...data })

    return {
      category
    }
  }
}
