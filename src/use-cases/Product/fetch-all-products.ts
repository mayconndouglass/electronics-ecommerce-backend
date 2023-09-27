import { ProductRepository } from "@/repositories/interfaces/product-repository"


export class FetchAllProductsUseCase {
  constructor(private productRepository: ProductRepository) { }

  async execute() {
    const products = await this.productRepository.fetchAllProducts()

    return products
  }
}
