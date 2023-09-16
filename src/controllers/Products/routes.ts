import { FastifyInstance } from "fastify"
import { registerProduct } from "./register-product-controller"

import { storage } from "../../middlewares/multer"
import multer from "fastify-multer"

export const productsRoutes = async (app: FastifyInstance) => {
  app.register(multer.contentParser)

  const upload = multer({ storage: storage })

  app.post("/products", { preHandler: upload.single("image") }, registerProduct)
}
