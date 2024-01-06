import { prisma } from "@/lib/prisma"

import { RegisterFavoriteItemDTO } from "@/dtos/RegisterFavoriteItemDTO"
import { FavoriteItemRepository } from "./interfaces/favorite-item-repository"

export class PrismaFavoriteItemRepository implements FavoriteItemRepository {
  async findManyByUser(userId: string) {
    const items = await prisma.favoriteItem.findMany({
      where: { user_id: userId },
      select: {
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
                  }
                }
              },
              take: 1
            }
          }
        }
      }
    })

    return items
  }

  async removeItem(userId: string, productId: string) {
    await prisma.favoriteItem.delete({
      where: {
        favoriteItem: { user_id: userId, product_id: productId }
      }
    })
  }

  async findItemByIds(userId: string, productId: string) {
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
