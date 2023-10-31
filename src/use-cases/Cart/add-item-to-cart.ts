import { RegisterCartItemDTO } from "@/dtos/RegisterCartItemDTO"
import { CartRepository } from "@/repositories/interfaces/cart-repository"
import { CartItemRepository } from "@/repositories/interfaces/item-cart-repository"
import { UserAlreadyHasAnOpenCartError } from "../errors/user-already-has-an-open-cart-error"

export class AddItemToCartUseCase {
  constructor(
    private cartRepository: CartRepository,
    private cartItemRepository: CartItemRepository
  ) { }

  async execute(data: RegisterCartItemDTO) {
    const doesTheUserAlreadyHaveACart =
      await this.cartRepository.findByUserId(data.user_id)

    if (doesTheUserAlreadyHaveACart) {
      console.log("ENTROU NA CONDITION")
      throw new UserAlreadyHasAnOpenCartError()
    }

    if (!data.cart_id) {
      data.cart_id = (await this.cartRepository.create({ user_id: data.user_id })).id
    }

    const cartItem = await this.cartItemRepository.create(data)

    return { item: cartItem }
  }
}
