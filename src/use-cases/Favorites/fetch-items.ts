import { FavoriteItemRepository } from "@/repositories/interfaces/favorite-item-repository"
import { UserRepository } from "@/repositories/interfaces/user-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

export class FetchItemsUseCase {
  constructor(
    private favoriteItemRepository: FavoriteItemRepository,
    private userRepository: UserRepository
  ) { }

  async execute(userId: string) {
    const userExists = await this.userRepository.findById(userId)

    if (!userExists) {
      throw new ResourceNotFoundError()
    }

    const items = await this.favoriteItemRepository.findManyByUser(userId)

    const mappingFavoriteItems = items.map(item => {
      const { product } = item

      return {
        id: product.id,
        price: product.promotional_price ?? product.price,
        name: product.name,
        imageUrl: product.ProductImage[0].image.url
      }
    })

    return mappingFavoriteItems
  }
}
