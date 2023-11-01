import { CartItemRepository } from "@/repositories/interfaces/item-cart-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

export class RemoveItemFromCartUseCase {
  constructor(private cartItemRepository: CartItemRepository) { }

  async execute(itemId: string) {
    const item = await this.cartItemRepository.findById(itemId)

    if (!item) {
      throw new ResourceNotFoundError()
    }

    await this.cartItemRepository.removeItem(itemId)
  }
}
