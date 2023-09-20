import { Image } from "@prisma/client"

export interface ImageRepository {
  create(url: string): Promise<Image>
}
