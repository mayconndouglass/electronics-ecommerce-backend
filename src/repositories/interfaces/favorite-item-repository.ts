import { RegisterFavoriteItemDTO } from "@/dtos/RegisterFavoriteItemDTO"
import { FavoriteItem } from "@prisma/client"

export interface FavoriteItemRepository {
  findItemByUser(userId: string, productId: string): Promise<FavoriteItem | null>
  register(data: RegisterFavoriteItemDTO): Promise<FavoriteItem>
}
