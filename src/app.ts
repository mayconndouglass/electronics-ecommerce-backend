import fastify from "fastify"
import cors from "@fastify/cors"
import fastifyJwt from "@fastify/jwt"

import { ZodError } from "zod"
import { env } from "./env"
import { categoriesRoutes } from "./controllers/Categories/routes"
import { productsRoutes } from "./controllers/Products/routes"
import { usersRoutes } from "./controllers/Users/routes"
import { cartRoutes } from "./controllers/Carts/routes"

export const app = fastify()
app.register(fastifyJwt, { secret: env.JWT_SECRET })

app.register(categoriesRoutes)
app.register(productsRoutes)
app.register(usersRoutes)
app.register(cartRoutes)

app.register(cors, {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() })
  }

  if (env.NODE_ENV !== "production") {
    console.error(error)
  }

  return reply.status(500).send({ message: "Internal server error" })
})
