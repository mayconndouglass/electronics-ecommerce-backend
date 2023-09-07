import fastify from "fastify"
import fastifyStatic from "@fastify/static"

import { ZodError } from "zod"
import { env } from "./env"
import { categoriesRoutes } from "./controllers/Categories/routes"
import path from "path"

export const app = fastify()

app.register(categoriesRoutes)

app.register(fastifyStatic, {
  root: path.join(__dirname, "..", "uploads"),
  prefix: "/images",
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
