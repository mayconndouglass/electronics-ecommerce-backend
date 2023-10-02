import { ProductRepository } from "@/repositories/interfaces/product-repository"

export class FetchAllProductsOnSaleUseCase {
  constructor(private productRepository: ProductRepository) { }

  async execute() {
    const products = await this.productRepository.fetchAllProductOnsale()

    return products
  }
}
