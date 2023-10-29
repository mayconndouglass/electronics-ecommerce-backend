import { FastifyInstance } from "fastify"
import multer from "fastify-multer"
import { storage } from "../../middlewares/multer"

import { registerUser } from "./register-user-controller"

export const usersRoutes = async (app: FastifyInstance) => {
  app.register(multer.contentParser)

  const upload = multer({ storage: storage })

  app.post("/users", { preHandler: upload.single("image") }, registerUser)
}
