import { FastifyInstance } from "fastify"

import { AddItemToCart } from "./add-item-to-cart-controller"
import { FetchAllItemsFromCart } from "./fetch-all-items-from-cart-controller"
import { RemoveAllItems } from "./remove-all-items-controller"
import { RemoveItemFromCart } from "./remove-item-from-cart-controller"
import { ChangeQuantityOfItems } from "./change-quantity-of-items-controller"
import { verifyJwt } from "@/middlewares/verify-jwt"
import { UpdateCartItems } from "./update-cart-items-controller"

export const cartRoutes = async (app: FastifyInstance) => {
  app.post("/cart/add-to-cart", { onRequest: [verifyJwt] }, AddItemToCart)
  app.get("/cart/items", { onRequest: [verifyJwt] }, FetchAllItemsFromCart)
  app.patch(
    "/cart/item/change-quantity",
    { onRequest: [verifyJwt] },
    ChangeQuantityOfItems
  )
  app.delete(
    "/cart/remove-item/:id",
    { onRequest: [verifyJwt] },
    RemoveItemFromCart
  )
  app.delete(
    "/cart/remove-all-items",
    { onRequest: [verifyJwt] },
    RemoveAllItems)
  app.patch(
    "/cart/update-cart-items",
    { onRequest: [verifyJwt] },
    UpdateCartItems
  )
}
