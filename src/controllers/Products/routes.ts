import { FastifyInstance } from "fastify"
import { registerProduct } from "./register-product-controller"
import { fetchAllProducts } from "./fetch-all-products-controller"
import { fetchAllProductsOnSale } from "./fetch-all-products-on-sale-controller"
import { fetchFeaturedProducts } from "./fetch-featured-products-controller"

import { storage } from "../../middlewares/multer"
import multer from "fastify-multer"

export const productsRoutes = async (app: FastifyInstance) => {
  app.register(multer.contentParser)
  const upload = multer({ storage: storage })

  app.post("/products", { preHandler: upload.array("images") }, registerProduct)
  app.get("/products", fetchAllProducts)
  app.get("/products-on-sale", fetchAllProductsOnSale)
  app.get("/featured-products", fetchFeaturedProducts)
}
