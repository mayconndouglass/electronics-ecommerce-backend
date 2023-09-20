import { prisma } from "@/lib/prisma"
import { ImageRepository } from "./interfaces/image-repository"

export class PrismaImageRepository implements ImageRepository {
  async create(url: string) {
    const imageUrl = await prisma.image.create({
      data: {
        url
      }
    })

    return imageUrl
  }
}
