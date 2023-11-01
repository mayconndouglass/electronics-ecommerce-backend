import { CartItemRepository } from "@/repositories/interfaces/item-cart-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

export class ChangeQuantityOfItemsUseCase {
  constructor(private cartItemRepository: CartItemRepository) { }

  async execute(itemId: string, quantity: number) {
    const item = await this.cartItemRepository.findById(itemId)

    if (!item) {
      throw new ResourceNotFoundError()
    }

    const itemWithTheModifiedQuantity = await this.cartItemRepository.updateQuantity(itemId, quantity)

    return { item: itemWithTheModifiedQuantity }
  }
}
