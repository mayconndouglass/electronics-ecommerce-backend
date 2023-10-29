import { User } from "@prisma/client"
import { RegisterUserDTO } from "@/dtos/RegisterUserDTO"

export interface UserRepository {
  create(data: RegisterUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
