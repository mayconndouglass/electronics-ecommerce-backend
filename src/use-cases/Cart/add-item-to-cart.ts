import { CartRepository } from "@/repositories/interfaces/cart-repository"
import { CartItemRepository } from "@/repositories/interfaces/cart-item-repository"
import { RegisterCartItemDTO } from "@/dtos/RegisterCartItemDTO"
import { NotAllowedError } from "../errors/not-allowed-error"
import { UserRepository } from "@/repositories/interfaces/user-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

export class AddItemToCartUseCase {
  constructor(
    private cartRepository: CartRepository,
    private cartItemRepository: CartItemRepository,
    private userRepository: UserRepository
  ) { }

  async execute(data: Omit<RegisterCartItemDTO, "cartId">) {
    const user = await this.userRepository.findById(data.userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    let cart = await this.cartRepository.findByUserId(user.id)

    if (!cart) {
      cart = await this.cartRepository.create(data)
    }

    const productExists = await this.cartItemRepository
      .findByProductId(data.userId, data.productId)

    if (productExists) {
      throw new NotAllowedError()
    }

    const cartItem = await this.cartItemRepository
      .create({ ...data, cartId: cart.id })

    return { item: cartItem }
  }
}
