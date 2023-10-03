import { ProductType } from "@/types/product"
import { ProductTypeTwo } from "@/types/product-type-two"
import { Prisma, Product } from "@prisma/client"

export interface ProductRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  fetchAllProducts(): Promise<ProductType[]>
  fetchAllProductOnsale(): Promise<ProductTypeTwo[]>
  fetchFeaturedProducts(): Promise<ProductTypeTwo[]>
}
