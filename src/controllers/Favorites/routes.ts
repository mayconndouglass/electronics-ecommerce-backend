import { verifyJwt } from "@/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { addItemToFavorites } from "./add-item-to-favorites-controller"
import { removeItemFromFavorites } from "./remove-item-from-favorites-controller"
import { FetchItemsController } from "./fetch-items-controller"

export const favoriteRoutes = async (app: FastifyInstance) => {
  app.post(
    "/wish-list/add-item-to-favorites",
    { onRequest: [verifyJwt] },
    addItemToFavorites
  )
  app.post(
    "/wish-list/remove-item-from-favorites",
    { onRequest: [verifyJwt] },
    removeItemFromFavorites
  )
  app.get(
    "/wish-list/favorite-items",
    { onRequest: [verifyJwt] },
    FetchItemsController
  )
}
