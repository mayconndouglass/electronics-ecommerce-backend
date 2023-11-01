import { CartRepository } from "@/repositories/interfaces/cart-repository"
import { CartItemRepository } from "@/repositories/interfaces/item-cart-repository"
import { CartDoesNotExist } from "../errors/cart-does-not-exist-error"

export class RemoveAllItemsUseCase {
  constructor(
    private cartRepository: CartRepository,
    private cartItemRepository: CartItemRepository
  ) { }

  async execute(cartId: string) {
    const cart = await this.cartRepository.findById(cartId)

    if (!cart) {
      throw new CartDoesNotExist()
    }

    await this.cartItemRepository.removeAllItems(cartId)
  }
}
