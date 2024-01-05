import { RegisterFavoriteItemDTO } from "@/dtos/RegisterFavoriteItemDTO"
import { FavoriteItem } from "@prisma/client"

export interface FavoriteItemRepository {
  removeItem(userId: string, productId: string): Promise<void>
  findItemByIds(userId: string, productId: string): Promise<FavoriteItem | null>
  register(data: RegisterFavoriteItemDTO): Promise<FavoriteItem>
}
