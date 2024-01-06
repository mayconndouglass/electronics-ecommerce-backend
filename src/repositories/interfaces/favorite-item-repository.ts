import { RegisterFavoriteItemDTO } from "@/dtos/RegisterFavoriteItemDTO"
import { FavoriteItem } from "@prisma/client"

export interface FavoriteItemRepository {
  findManyByUser(userId: string): Promise<Omit<FavoriteItem, "user_id">[]>
  removeItem(userId: string, productId: string): Promise<void>
  findItemByIds(userId: string, productId: string): Promise<FavoriteItem | null>
  register(data: RegisterFavoriteItemDTO): Promise<FavoriteItem>
}
