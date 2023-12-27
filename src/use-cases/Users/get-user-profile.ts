import { UserRepository } from "@/repositories/interfaces/user-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(id: string) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
