import { ProductRepository } from "@/repositories/interfaces/product-repository"
import { ProductPaginationDTO } from "@/dtos/ProductPaginationDTO"

export class ProductPagination {
  constructor(private productRepository: ProductRepository) { }

  async execute(paginationParams: ProductPaginationDTO) {
    const products = await this.productRepository.pagination(
      paginationParams.page,
      paginationParams.limit,
      paginationParams.orderBy,
      paginationParams.category,
      paginationParams.color,
      paginationParams.maxPrice
    )
    
    return products
  }
}
