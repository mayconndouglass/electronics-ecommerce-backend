import { FastifyInstance } from "fastify"
import { registerProduct } from "./register-product-controller"
import { registerProductWhoutImageUpload } from "./register-products-without-image-upload"
import { fetchAllProducts } from "./fetch-all-products-controller"
import { fetchAllProductsOnSale } from "./fetch-all-products-on-sale-controller"
import { fetchFeaturedProducts } from "./fetch-featured-products-controller"

import { storage } from "../../middlewares/multer"
import multer from "fastify-multer"
import { getProductController } from "./get-product-details-controller"
import { paginationController } from "./pagiantion-controller"

export const productsRoutes = async (app: FastifyInstance) => {
  app.register(multer.contentParser)
  const upload = multer({ storage: storage })

  app.post("/products", { preHandler: upload.array("images") }, registerProduct)
  app.post("/products2", registerProductWhoutImageUpload)
  app.get("/products", fetchAllProducts)
  app.get("/products-on-sale", fetchAllProductsOnSale)
  app.get("/featured-products", fetchFeaturedProducts)
  app.get("/product/:id", getProductController)
  app.get("/products/paginated", paginationController)
}
