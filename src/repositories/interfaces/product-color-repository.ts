import { RegisterProductColorDTO } from "@/dtos/RegisterProductColorDTO"
import { ProductColor } from "@prisma/client"

export interface ProductColorRepository {
  create(data: RegisterProductColorDTO): Promise<ProductColor>
}
