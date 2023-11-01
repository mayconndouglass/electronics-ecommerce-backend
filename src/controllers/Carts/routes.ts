import { FastifyInstance } from "fastify"

import { AddItemToCart } from "./add-item-to-cart-controller"
import { FetchAllItemsFromCart } from "./fetch-all-items-from-cart-controller"
import { RemoveAllItems } from "./remove-all-items-controller"
import { RemoveItemFromCart } from "./remove-item-from-cart-controller"

export const cartRoutes = async (app: FastifyInstance) => {
  app.post("/cart/add-to-cart", AddItemToCart)
  app.get("/cart/:id/items", FetchAllItemsFromCart)
  app.delete("/cart/:id/remove-all-items", RemoveAllItems)
  app.delete("/cart/remove-item/:id", RemoveItemFromCart)
}
