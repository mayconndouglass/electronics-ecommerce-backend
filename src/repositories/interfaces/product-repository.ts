import { ProductType } from "@/types/product"
import { Prisma, Product } from "@prisma/client"

export interface ProductRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  fetchAllProducts(): Promise<ProductType[]>
}
