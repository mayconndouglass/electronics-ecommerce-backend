import { RegisterUserDTO } from "@/dtos/RegisterUserDTO"
import { UpdateUserDataProps } from "@/types/update-user-data"
import { User } from "@prisma/client"

export interface UserRepository {
  create(data: RegisterUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  updateData(data: UpdateUserDataProps): Promise<void>//TODO: Tem que testar isso aqui, dando console nos dados recebidos para ver se os dados não enviados serão no formato undefined ou null
}
