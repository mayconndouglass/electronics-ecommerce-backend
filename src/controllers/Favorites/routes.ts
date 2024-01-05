import { verifyJwt } from "@/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { addItemToFavorites } from "./add-item-to-favorites-controller"

export const favoriteRoutes = async (app: FastifyInstance) => {
  app.post(
    "/wish-list/add-item-to-favorites",
    { onRequest: [verifyJwt] },
    addItemToFavorites
  )
}
