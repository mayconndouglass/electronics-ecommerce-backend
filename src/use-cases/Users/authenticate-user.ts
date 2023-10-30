import { AuthenticateUserDTO } from "@/dtos/AuthenticateUserDTO"
import { UserRepository } from "@/repositories/interfaces/user-repository"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error"
import { compare } from "bcryptjs"

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(data: AuthenticateUserDTO) {
    const user = await this.userRepository.findByEmail(data.email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordsMatch = await compare(data.password, user.password_hash)

    if (!doesPasswordsMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user
    }
  }
}
