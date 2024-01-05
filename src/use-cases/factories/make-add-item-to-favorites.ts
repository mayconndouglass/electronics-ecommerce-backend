import { PrismaFavoriteItemRepository } from "@/repositories/prisma-favorite-item-repository"
import { PrismaProductRepository } from "@/repositories/prisma-product-repository"
import { PrismaUserRepository } from "@/repositories/prisma-user-repository"
import { AddItemToFavoritesUseCase } from "../Favorites/add-item-to-favorites"

export const MakeAddItemToFavorites = () => {
  const favoriteRepository = new PrismaFavoriteItemRepository()
  const useRepository = new PrismaUserRepository()
  const productRepository = new PrismaProductRepository()

  const addItemToFavorites = new AddItemToFavoritesUseCase(
    favoriteRepository,
    useRepository,
    productRepository
  )

  return addItemToFavorites
}
