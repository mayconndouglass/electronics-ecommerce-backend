import { ProductRepository } from "@/repositories/interfaces/product-repository"

export class FetchFeaturedProducts {
  constructor(private productRepository: ProductRepository) { }

  async execute() {
    const featuredProducts = await this.productRepository.fetchFeaturedProducts()

    return featuredProducts
  }
}
