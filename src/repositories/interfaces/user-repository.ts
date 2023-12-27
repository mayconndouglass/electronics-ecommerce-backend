import { RegisterUserDTO } from "@/dtos/RegisterUserDTO"
import { User } from "@prisma/client"

export interface UserRepository {
  create(data: RegisterUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
