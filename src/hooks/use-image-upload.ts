import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { getstorage } from "@/config/firebase-config"
import { FastifyRequest } from "fastify"

export interface MulterRequest extends FastifyRequest {
  file: {
    originalname: string
    buffer: Blob
  }
}

export const useImageUpload = async (req: MulterRequest, folder: string) => {
  const reqFile = req.file
  const newFileName = `${Date.now()}-${reqFile.originalname}`
  const storageRef = ref(getstorage, `images/${folder}/${newFileName}`)

  await uploadBytes(storageRef, reqFile.buffer)
  const url: string = await getDownloadURL(storageRef)

  return [url]
}
