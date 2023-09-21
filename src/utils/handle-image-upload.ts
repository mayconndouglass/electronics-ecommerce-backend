import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { getstorage } from "@/config/firebase-config"
import { FastifyRequest } from "fastify"

type ImageFile = {
  originalname: string
  buffer: Blob
}

export interface MulterRequest extends FastifyRequest {
  files: ImageFile[],
  file: ImageFile
}

/* export const useImageUpload = async (req: MulterRequest, folder: string) => {
  const reqFile = req.file
  const newFileName = `${Date.now()}-${reqFile.originalname}`
  const storageRef = ref(getstorage, `images/${folder}/${newFileName}`)

  await uploadBytes(storageRef, reqFile.buffer)
  const url: string = await getDownloadURL(storageRef)

  return [url]
}

export const useImagesUpload = async (req: MulterRequest, folder: string) => {
  const files = req.files
  console.log(files)
  const urls = await Promise.all(files.map(async (image) => {
    const newFileName = `${Date.now()}-${image.originalname}`
    const storageRef = ref(getstorage, `images/${folder}/${newFileName}`)

    await uploadBytes(storageRef, image.buffer)
    const url = await getDownloadURL(storageRef)

    return url
  }))
  console.log("URLSSSSSSSSSSSSSS", urls)
  return urls
} */

export const handleImageUpload = {
  async _uploadImage(image: ImageFile, folder: string) {
    const newFileName = `${Date.now()}-${image.originalname}`
    const storageRef = ref(getstorage, `images/${folder}/${newFileName}`)

    await uploadBytes(storageRef, image.buffer)
    const url = await getDownloadURL(storageRef)

    return url
  },
  async uploadSingleImage(req: MulterRequest, folder: string) {
    const reqFile = req.file
    const url = await this._uploadImage(reqFile, folder)

    return url
  },
  async uploadMultipleImages(req: MulterRequest, folder: string) {
    const files = req.files

    const urls = await Promise.all(files.map(async (image) => {
      return this._uploadImage(image, folder)
    }))
    console.log("URLSSSSSSSSSSSSSS", urls)

    return urls
  }
}
