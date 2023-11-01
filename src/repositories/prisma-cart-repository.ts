import { prisma } from "@/lib/prisma"
import { CartRepository } from "./interfaces/cart-repository"

export class PrismaCartRepository implements CartRepository {
  async findByUserId(userId: string) {
    const cart = await prisma.cart.findUnique({ where: { user_id: userId } })

    return cart
  }

  async create(data: { user_id: string; }) {
    const cart = await prisma.cart.create({ data })

    return cart
  }

  async findById(itemId: string) {
    const cart = await prisma.cart.findUnique({ where: { id: itemId } })

    return cart
  }

}
