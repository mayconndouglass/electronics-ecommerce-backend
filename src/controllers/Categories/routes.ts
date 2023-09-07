import { FastifyInstance } from "fastify"
import { registerCategory } from "./register.category"

import { storage } from "../../middlewares/multer"
import multer from "fastify-multer"
import { fetchAllCategories } from "./fetch-all.category"

export const categoriesRoutes = async (app: FastifyInstance) => {
  app.register(multer.contentParser)

  const upload = multer({ storage: storage })

  app.post("/categories", { preHandler: upload.single("image") }, registerCategory)
  app.get("/categories", fetchAllCategories)
}
