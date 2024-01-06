import { RegisterFavoriteItemDTO } from "@/dtos/RegisterFavoriteItemDTO"
import { FavoriteItem } from "@prisma/client"
import { FavoriteItemType } from "@/types/type-cart-item"

export interface FavoriteItemRepository {
  findManyByUser(userId: string): Promise<FavoriteItemType[]>
  removeItem(userId: string, productId: string): Promise<void>
  findItemByIds(userId: string, productId: string): Promise<FavoriteItem | null>
  register(data: RegisterFavoriteItemDTO): Promise<FavoriteItem>
}
