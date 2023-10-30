import { FastifyInstance } from "fastify"
import multer from "fastify-multer"
import { storage } from "../../middlewares/multer"
import { verifyJwt } from "@/middlewares/verify-jwt"

import { registerUser } from "./register-user-controller"
import { AuthenticateUser } from "./authenticate-user-controller"
import { profile } from "./profile-controller"

export const usersRoutes = async (app: FastifyInstance) => {
  app.register(multer.contentParser)
  const upload = multer({ storage: storage })

  app.post("/users", { preHandler: upload.single("image") }, registerUser)
  app.post("/sessions", AuthenticateUser)

  app.get("/me", { onRequest: [verifyJwt] }, profile)
}
