import { FastifyInstance } from "fastify"
import { fetchAllColors } from "./fetch-all-colors-controller"

export const colorsRoutes = async (app: FastifyInstance) => {

  app.get("/colors", fetchAllColors)
}
