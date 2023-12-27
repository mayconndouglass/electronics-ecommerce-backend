import { CartRepository } from "@/repositories/interfaces/cart-repository"
import { CartItemRepository } from "@/repositories/interfaces/cart-item-repository"
import { CartDoesNotExist } from "../errors/cart-does-not-exist-error"

export class RemoveAllItemsUseCase {
  constructor(
    private cartRepository: CartRepository,
    private cartItemRepository: CartItemRepository
  ) { }

  async execute(userId: string) {
    const cart = await this.cartRepository.findByUserId(userId)

    if (!cart) {
      throw new CartDoesNotExist()
    }

    await this.cartItemRepository.removeAllItems(cart.id)
  }
}
