import { FastifyInstance } from "fastify"
import { verifyJwt } from "@/middlewares/verify-jwt"

import { registerUser } from "./register-user-controller"
import { AuthenticateUser } from "./authenticate-user-controller"
import { profile } from "./profile-controller"

export const usersRoutes = async (app: FastifyInstance) => {
  app.post("/users", registerUser)
  app.post("/sessions", AuthenticateUser)

  //Authentication
  app.get("/me", { onRequest: [verifyJwt] }, profile)
}
