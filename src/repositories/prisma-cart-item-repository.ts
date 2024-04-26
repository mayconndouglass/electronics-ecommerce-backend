import { RegisterCartItemDTO } from "@/dtos/RegisterCartItemDTO"
import { CartItemRepository } from "./interfaces/cart-item-repository"
import { prisma } from "@/lib/prisma"

export class PrismaCartItemRepository implements CartItemRepository {
  async removeCartId(itemId: string) {
    const item = await prisma.cartItem.update({
      where: {
        id: itemId
      }, data: {
        cart_id: null
      }
    })

    console.log("Item no PrismaCartItem", item)
  }

  async findByProductId(userId: string, productId: string) {
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        user_id: userId,
        product_id: productId
      }
    })

    return cartItem
  }

  async findByCartIdAndProductId(cartId: string, productId: string) {
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cart_id: cartId,
        product_id: productId
      }
    })

    return cartItem
  }

  async create(data: RegisterCartItemDTO) {
    const cart = await prisma.cartItem.create({
      data: {
        cart_id: data.cartId,
        product_id: data.productId,
        quantity: data.quantity,
        user_id: data.userId,
        price: data.price,
      }
    })

    return cart
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
