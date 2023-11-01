import { RegisterCartItemDTO } from "@/dtos/RegisterCartItemDTO"
import { CartItemRepository } from "./interfaces/item-cart-repository"
import { prisma } from "@/lib/prisma"

export class PrismaCartItemRepository implements CartItemRepository {
  async create(data: RegisterCartItemDTO) {
    const cart = await prisma.cartItem.create({ data })

    return cart
  }

  async fetchAllItemsFromCart(cartId: string) {
    const items = await prisma.cartItem.findMany({
      where: {
        cart_id: cartId
      }
    })

    return items
  }

  async findById(itemId: string) {
    const item = await prisma.cartItem.findUnique({ where: { id: itemId } })

    return item
  }

  async removeItem(itemId: string) {
    await prisma.cartItem.delete({ where: { id: itemId } })
  }

  async removeAllItems(cartId: string) {
    await prisma.cartItem.deleteMany({ where: { cart_id: cartId } })
  }

  async updateQuantity(itemId: string, quantity: number) {
    const item = await prisma.cartItem.update({
      where: {
        id: itemId
      },
      data: {
        quantity: quantity
      }
    })

    return item
  }
}
