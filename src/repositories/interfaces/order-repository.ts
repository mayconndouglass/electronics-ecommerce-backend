import { RegisterOrderRepositoryDTO } from "@/dtos/RegisterOrderDTO"

export interface OrderReposistory {
  register(data: RegisterOrderRepositoryDTO): Promise<void>
}
