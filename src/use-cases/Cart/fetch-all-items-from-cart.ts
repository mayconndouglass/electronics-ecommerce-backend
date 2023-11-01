import { CartItemRepository } from "@/repositories/interfaces/item-cart-repository"
import { CartDoesNotExist } from "../errors/cart-does-not-exist-error"
import { CartRepository } from "@/repositories/interfaces/cart-repository"

export class FetchAllItemsFromCartUseCase {
  constructor(
    private cartItemrepository: CartItemRepository,
    private cartRepository: CartRepository
  ) { }

  async execute(cartId: string) {
    const cart = await this.cartRepository.findById(cartId)

    if (!cart) {
      throw new CartDoesNotExist()
    }

    const items = await this.cartItemrepository.fetchAllItemsFromCart(cartId)

    return items
  }
}
