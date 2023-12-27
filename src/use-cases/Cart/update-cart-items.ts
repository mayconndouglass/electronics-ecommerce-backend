import { CartItemRepository } from "@/repositories/interfaces/cart-item-repository"
import { CartRepository } from "@/repositories/interfaces/cart-repository"
import { CartItemFrontEndType } from "@/types/type-cart-item"

export class UpdateCartItemsUseCase {
  constructor(
    private cartItemRepository: CartItemRepository,
    private cartRepository: CartRepository
  ) { }

  calculateNewPrice(price: string, quantity: number) {
    const newPrice = Number(
      price
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".")
    ) * quantity

    const formatedPrice = newPrice
      .toLocaleString("pt-br", { style: "currency", currency: "BRL" })

    return formatedPrice
  }

  async execute(items: CartItemFrontEndType[], userId: string) {
    let cart = await this.cartRepository.findByUserId(userId)

    if (!cart) {
      cart = await this.cartRepository.create({ userId })
    }

    items.forEach(async item => {
      const itemExists = await this.cartItemRepository.findByCartIdAndProductId(
        cart!.id,
        item.id
      )

      if (itemExists && itemExists.quantity !== item.quantity) {
        await this.cartItemRepository.updateQuantity(
          itemExists.id,
          item.quantity,
          this.calculateNewPrice(item.price, item.quantity)
        )
      }

      if (!itemExists) {
        await this.cartItemRepository.create({
          userId,
          quantity: item.quantity,
          price: this.calculateNewPrice(item.price, item.quantity),
          productId: item.id,
          cartId: cart!.id
        })
      }
    })
  }
}
