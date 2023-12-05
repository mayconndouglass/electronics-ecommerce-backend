import { CartRepository } from "@/repositories/interfaces/cart-repository"
import { CartDoesNotExist } from "../errors/cart-does-not-exist-error"

export class FetchAllItemsFromCartUseCase {
  constructor(
    private cartRepository: CartRepository
  ) { }

  private formatToNumber(price: string) {
    const formattedPrice = Number(
      price
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".")
    )

    return formattedPrice
  }

  async execute(userId: string) {
    const userHasACart = await this.cartRepository.findByUserId(userId)

    if (!userHasACart) {
      throw new CartDoesNotExist()
    }

    const items = await this.cartRepository
      .findManyCartItemFromCart(userHasACart.id)

    let totalPrice: number = 0
    let totalQuantity: number = 0

    const mappingItems = items.map(item => {
      const { product } = item

      totalQuantity += item.quantity
      totalPrice += this.formatToNumber(item.price)

      return {
        id: product.id,
        name: product.name,
        price: product.promotional_price ?? product.price,
        imageUrl: product.ProductImage[0].image.url,
        quantity: item.quantity
      }
    })

    return { cart: { totalPrice, totalQuantity, items: mappingItems } }
  }
}
