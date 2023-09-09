import fastifyMulter from "fastify-multer"

export const storage = fastifyMulter.memoryStorage()
