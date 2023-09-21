import { RegisterProductImageDTO } from "@/dtos/RegisterProductImageDTO"

export interface ProductImageRepository {
  create(data: RegisterProductImageDTO): Promise<void>
}
