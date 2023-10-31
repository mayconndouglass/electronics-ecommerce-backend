import { FastifyInstance } from "fastify"
import { AddItemToCart } from "./add-item-to-cart-controller"

export const cartRoutes = async (app: FastifyInstance) => {
  app.post("/add-to-cart", AddItemToCart)
}
