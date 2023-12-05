import { RegisterCartItemDTO } from "@/dtos/RegisterCartItemDTO"
import { CartItemRepository } from "./interfaces/cart-item-repository"
import { prisma } from "@/lib/prisma"

export class PrismaCartItemRepository implements CartItemRepository {
  async create(data: RegisterCartItemDTO) {
    const cart = await prisma.cartItem.create({ data })

    return cart
  }

  async findById(itemId: string) {
    const item = await prisma.cartItem.findUnique({ where: { id: itemId } })

    return item
  }

  async findByProductId(productId: string) {
    const item = await prisma.cartItem
      .findFirst({ where: { product_id: productId } })

    return item
  }

  async removeItem(itemId: string) {
    await prisma.cartItem.delete({ where: { id: itemId } })
  }

  async removeAllItems(cartId: string) {
    await prisma.cartItem.deleteMany({ where: { cart_id: cartId } })
  }

  async updateQuantity(itemId: string, quantity: number, price: string) {
    const item = await prisma.cartItem.update({
      where: {
        id: itemId
      },
      data: {
        quantity,
        price
      }
    })

    return item
  }
}
