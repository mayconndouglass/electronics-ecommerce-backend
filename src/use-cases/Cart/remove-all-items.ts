import { CartRepository } from "@/repositories/interfaces/cart-repository"
import { CartItemRepository } from "@/repositories/interfaces/cart-item-repository"
import { CartDoesNotExist } from "../errors/cart-does-not-exist-error"

export class RemoveAllItemsUseCase {
  constructor(
    private cartRepository: CartRepository,
    private cartItemRepository: CartItemRepository
  ) { }

  //TODO: Acredito que falta verificar se o id do user que está fazendo a request é o dono do carrinho, não fiz logo agora pq creio que possa ser uma boa, pegar o id pelo SUT, ou seja, jtw/token/authentication
  async execute(cartId: string) {
    const cart = await this.cartRepository.findById(cartId)

    if (!cart) {
      throw new CartDoesNotExist()
    }

    await this.cartItemRepository.removeAllItems(cartId)
  }
}
