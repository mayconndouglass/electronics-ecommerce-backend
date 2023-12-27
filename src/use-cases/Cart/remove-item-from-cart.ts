import { CartItemRepository } from "@/repositories/interfaces/cart-item-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { CartRepository } from "@/repositories/interfaces/cart-repository"
import { NotAllowedError } from "../errors/not-allowed-error"

export class RemoveItemFromCartUseCase {
  constructor(
    private cartItemRepository: CartItemRepository,
    private cartRepository: CartRepository
  ) { }

  async execute(productId: string, userId: string) {
    const itemExists = await this.cartItemRepository.findByProductId(productId)
    const cartExists = await this.cartRepository.findByUserId(userId)

    if (!itemExists || !cartExists) {
      throw new ResourceNotFoundError()
    }

    if (cartExists.id !== itemExists.cart_id) {
      throw new NotAllowedError()
    }

    await this.cartItemRepository.removeItem(itemExists.id)
  }
}
