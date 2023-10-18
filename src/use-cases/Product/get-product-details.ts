import { ProductRepository } from "@/repositories/interfaces/product-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

export class GetProductDetails {
  constructor(private productRepository: ProductRepository) { }

  async execute(id: string) {
    const product = await this.productRepository.findProductById(id)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    return product
  }
}
