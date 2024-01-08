import { FavoriteItemRepository } from "@/repositories/interfaces/favorite-item-repository"
import { FavoriteItemFrontEndType } from "@/types/type-cart-item"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { UserRepository } from "@/repositories/interfaces/user-repository"

export class UpdateFavoriteItemsUseCase {
  constructor(
    private favoriteItemRepository: FavoriteItemRepository,
    private userRepository: UserRepository
  ) { }

  async execute(favoriteItems: FavoriteItemFrontEndType[], userId: string) {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    favoriteItems.forEach(async item => {
      const itemExist = await this.favoriteItemRepository
        .findItemByIds(user.id, item.id)

      if (!itemExist) {
        this.favoriteItemRepository.register(
          {
            userId: user.id,
            productId: item.id
          }
        )
      }
    })
  }
}
