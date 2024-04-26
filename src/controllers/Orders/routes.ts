import { FastifyInstance } from "fastify"
import { verifyJwt } from "@/middlewares/verify-jwt"
import { RegisterOrder } from "./register-order-controller"

export const ordersRoutes = async (app: FastifyInstance) => {
  app.post("/register-order", { onRequest: [verifyJwt] }, RegisterOrder)
}
