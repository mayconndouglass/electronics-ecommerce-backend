import { RegisterProductDTO } from "@/dtos/RegisterProductDTO"
import { Product } from "@prisma/client"

export interface ProductRepository {
  create(data: RegisterProductDTO): Promise<Product>
}
