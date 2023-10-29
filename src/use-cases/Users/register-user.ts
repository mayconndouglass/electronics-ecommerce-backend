import { UserRepository } from "@/repositories/interfaces/user-repository"
import { RegisterUserDTO } from "@/dtos/RegisterUserDTO"
import { EmailAlreadyExistsError } from "../errors/email-already-exist-error"
import { hash } from "bcryptjs"

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(
    data: Omit<RegisterUserDTO, "password_hash"> & { password: string }
  ) {
    const emailWithSameEmail = await this.userRepository.findByEmail(data.email)

    if (emailWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }

    const { password, ...restData } = data
    const password_hash = await hash(password, 6)

    const user = await this.userRepository.create({ ...restData, password_hash })

    return {
      user
    }
  }
}
