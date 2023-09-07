// import path from "path"
import fastifyMulter from "fastify-multer"

/* export const storage = fastifyMulter.diskStorage({
  destination: path.join(__dirname, "..", "..", "uploads"),
  filename(req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`)
  }
}) */

export const storage = fastifyMulter.memoryStorage()
