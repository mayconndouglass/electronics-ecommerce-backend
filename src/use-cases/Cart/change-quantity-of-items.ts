import { CartItemRepository } from "@/repositories/interfaces/cart-item-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { ProductRepository } from "@/repositories/interfaces/product-repository"

export class ChangeQuantityOfItemsUseCase {
  constructor(
    private cartItemRepository: CartItemRepository,
    private productRepository: ProductRepository
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

  async execute(userId: string, itemId: string, quantity: number) {
    const item = await this.cartItemRepository.findByProductId(userId, itemId)

    if (!item) {
      throw new ResourceNotFoundError()
    }

    const product = await this.productRepository
      .findProductById(item.product_id)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    const price = product.promotional_price ?? product.price

    const newFormattedPrice = this.calculateNewPrice(price, quantity)

    const itemWithTheModifiedQuantity = await this.cartItemRepository
      .updateQuantity(item.id, quantity, newFormattedPrice)

    return { item: itemWithTheModifiedQuantity }
  }
}
