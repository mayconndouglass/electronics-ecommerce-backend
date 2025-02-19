import { paginationProductType } from "@/types/pagination-product-type"
import { ProductType } from "@/types/product"
import { ProductTypeTwo } from "@/types/product-type-two"
import { Prisma, Product } from "@prisma/client"

export interface ProductRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  fetchAllProducts(): Promise<ProductType[]>
  fetchAllProductOnsale(): Promise<ProductTypeTwo[]>
  fetchFeaturedProducts(): Promise<ProductTypeTwo[]>
  findProductById(id: string): Promise<ProductType | null>
  pagination(
    page: number,
    limit: number,
    orderBy?: "older" | "newest" | "name" | "price",
    category?: string,
    color?: string,
    maxPrice?: number
  ): Promise<paginationProductType>
}
