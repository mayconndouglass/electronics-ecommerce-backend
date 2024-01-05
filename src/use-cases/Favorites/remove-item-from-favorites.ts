import { RemoveItemFromFavoritesDTO } from "@/dtos/RemoveItemFromFavoritesDTO"
import { FavoriteItemRepository } from "@/repositories/interfaces/favorite-item-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

export class RemoveItemFromFavoritesUseCase {
  constructor(
    private favoriteItemRepository: FavoriteItemRepository,
  ) { }

  async execute({ userId, productId }: RemoveItemFromFavoritesDTO) {
    const item = await this.favoriteItemRepository.findItemByIds(
      userId, productId
    )

    if (!item) {
      throw new ResourceNotFoundError()
    }

    await this.favoriteItemRepository.removeItem(userId, productId)
  }
}
