import { FavoriteItemRepository } from "@/repositories/interfaces/favorite-item-repository"
import { UserRepository } from "@/repositories/interfaces/user-repository"

import { RegisterFavoriteItemDTO } from "@/dtos/RegisterFavoriteItemDTO"

import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { NotAllowedError } from "../errors/not-allowed-error"
import { ProductRepository } from "@/repositories/interfaces/product-repository"

export class AddItemToFavoritesUseCase {
  constructor(
    private favoritemRepository: FavoriteItemRepository,
    private userRepository: UserRepository,
    private productRepository: ProductRepository
  ) { }

  async execute({ userId, productId }: RegisterFavoriteItemDTO) {
    const user = await this.userRepository.findById(userId)
    const product = await this.productRepository.findProductById(productId)

    if (!user || !product) {
      throw new ResourceNotFoundError()
    }

    const itemExists = await this.favoritemRepository.findItemByIds(
      userId,
      productId
    )

    if (itemExists) {
      throw new NotAllowedError()
    }

    const favoriteItem = await this.favoritemRepository.register({
      userId, productId
    })

    return { item: favoriteItem }
  }
}
