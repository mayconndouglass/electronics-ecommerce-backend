import { FastifyInstance } from "fastify"
import { registerCategory } from "./register.category"

export const categoriesRoutes = async (app: FastifyInstance) => {
  app.post("/categories", registerCategory)
}
