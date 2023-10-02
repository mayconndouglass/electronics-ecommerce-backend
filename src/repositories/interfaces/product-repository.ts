import { ProductType } from "@/types/product"
import { ProducOnSaletType } from "@/types/product-on-sale"
import { Prisma, Product } from "@prisma/client"

export interface ProductRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  fetchAllProducts(): Promise<ProductType[]>
  fetchAllProductOnsale(): Promise<ProducOnSaletType[]>
}
