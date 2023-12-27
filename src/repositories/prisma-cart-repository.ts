import { prisma } from "@/lib/prisma"
import { CartRepository } from "./interfaces/cart-repository"
import { CartItemType } from "@/types/type-cart-item"

export class PrismaCartRepository implements CartRepository {
  async findManyCartItemFromCart(cartId: string) {
    const items = await prisma.cartItem.findMany({
      where: {
        cart_id: cartId,
      },
      select: {
        quantity: true,
        price: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            promotional_price: true,
            ProductImage: {
              select: {
                image: {
                  select: {
                    url: true,
                  },
                }
              },
              take: 1
            }
          }
        }
      }
    })

    return items as CartItemType[]
  }

  async findByUserId(userId: string) {
    const cart = await prisma.cart.findUnique({ where: { user_id: userId } })

    return cart
  }

  async create({ userId }: { userId: string; }) {
    const cart = await prisma.cart.create({ data: { user_id: userId } })

    return cart
  }

  async findById(itemId: string) {
    const cart = await prisma.cart.findUnique({ where: { id: itemId } })

    return cart
  }

}
