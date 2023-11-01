import { RegisterCartItemDTO } from "@/dtos/RegisterCartItemDTO"
import { CartRepository } from "@/repositories/interfaces/cart-repository"
import { CartItemRepository } from "@/repositories/interfaces/item-cart-repository"
import { UserAlreadyHasAnOpenCartError } from "../errors/user-already-has-an-open-cart-error"
//TODO: SERÁ QUE O MELHOR NÃO SERIA VERIFICAR SE O CARRINHO EXISTE, E SE EXISTIR, AO INVÉS
// DE RETORNAR O ERRO, ADICIONAR O ITEM ?
export class AddItemToCartUseCase {
  constructor(
    private cartRepository: CartRepository,
    private cartItemRepository: CartItemRepository
  ) { }

  async execute(data: Omit<RegisterCartItemDTO, "cart_id"> & { cart_id?: string }) {
    if (!data.cart_id) {
      const doesTheUserAlreadyHaveACart =
        await this.cartRepository.findByUserId(data.user_id)

      if (doesTheUserAlreadyHaveACart) {
        throw new UserAlreadyHasAnOpenCartError()
      }

      data.cart_id = (await this.cartRepository.create({
        user_id: data.user_id
      })).id
    }

    const cartItem = await this.cartItemRepository.create(data as RegisterCartItemDTO)

    return { item: cartItem }
  }
}
