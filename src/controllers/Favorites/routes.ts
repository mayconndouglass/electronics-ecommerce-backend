import { verifyJwt } from "@/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { addItemToFavorites } from "./add-item-to-favorites-controller"
import { removeItemFromFavorites } from "./remove-item-from-favorites-controller"
import { FetchItemsController } from "./fetch-items-controller"
import { updateFavoriteItems } from "./update-favorite-items-controller"


export const favoriteRoutes = async (app: FastifyInstance) => {
  app.post(
    "/wish-list/add-item-to-favorites",
    { onRequest: [verifyJwt] },
    addItemToFavorites
  )
  app.delete(
    "/wish-list/remove-item-from-favorites/:id",
    { onRequest: [verifyJwt] },
    removeItemFromFavorites
  )
  app.get(
    "/wish-list/favorite-items",
    { onRequest: [verifyJwt] },
    FetchItemsController
  )
  app.patch(
    "/wish-list/update-favorite-items",
    { onRequest: [verifyJwt] },
    updateFavoriteItems
  )
}
