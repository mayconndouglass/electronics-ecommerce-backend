import { CartRepository } from "@/repositories/interfaces/cart-repository"
import { CartItemRepository } from "@/repositories/interfaces/cart-item-repository"
import { RegisterCartItemDTO } from "@/dtos/RegisterCartItemDTO"
import { UserAlreadyHasAnOpenCartError } from "../errors/user-already-has-an-open-cart-error"
import { NotAllowedError } from "../errors/not-allowed-error"

export class AddItemToCartUseCase {
  constructor(
    private cartRepository: CartRepository,
    private cartItemRepository: CartItemRepository
  ) { }

  async execute(
    data: Omit<RegisterCartItemDTO, "cart_id"> & { cart_id?: string }
  ) {
    const cartDoesNotExist = !data.cart_id

    if (cartDoesNotExist) {
      const doesTheUserAlreadyHaveACart =
        await this.cartRepository.findByUserId(data.user_id)

      if (doesTheUserAlreadyHaveACart) {
        throw new UserAlreadyHasAnOpenCartError()
      }

      data.cart_id = (await this.cartRepository.create({
        user_id: data.user_id
      })).id
    }

    const productExists = await this.cartItemRepository
      .findByProductId(data.product_id)

    if (productExists) {
      throw new NotAllowedError()
    }

    const cartItem = await this.cartItemRepository
      .create(data as RegisterCartItemDTO)

    return { item: cartItem }
  }
}
