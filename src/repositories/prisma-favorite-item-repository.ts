import { prisma } from "@/lib/prisma"

import { RegisterFavoriteItemDTO } from "@/dtos/RegisterFavoriteItemDTO"
import { FavoriteItemRepository } from "./interfaces/favorite-item-repository"

export class PrismaFavoriteItemRepository implements FavoriteItemRepository {
  async findItemByUser(userId: string, productId: string) {
    const item = await prisma.favoriteItem.findFirst({
      where: { user_id: userId, product_id: productId }
    })

    return item
  }

  async register(data: RegisterFavoriteItemDTO) {
    const item = await prisma.favoriteItem.create({
      data: {
        user_id: data.userId,
        product_id: data.productId
      }
    })

    return item
  }
}
