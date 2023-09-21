import { Product } from "@prisma/client"
import { RegisterProductDTO } from "@/dtos/RegisterProductDTO"

import { ColorRepository } from "@/repositories/interfaces/color-repository"
import { ImageRepository } from "@/repositories/interfaces/image-repository"
import { ProductColorRepository } from "@/repositories/interfaces/product-color-repository"
import { ProductImageRepository } from "@/repositories/interfaces/product-image-repository"
import { ProductRepository } from "@/repositories/interfaces/product-repository"


export class RegisterProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private colorRepository: ColorRepository,
    private productColorRepository: ProductColorRepository,
    private productImageRepository: ProductImageRepository,
    private imageRepository: ImageRepository
  ) { }

  private calculatePromotionalPrice(price: string, discount: number) {
    const priceValue = Number(price.trim().replace("R$", ""))
    const calculatedPromotionalPrice =
      (priceValue - (priceValue * discount) / 100).toFixed(2)

    return calculatedPromotionalPrice
  }

  private async processImages(urls: string[], product: Product) {
    const imageUrls = await Promise.all(urls.map(async (url) => {
      const image = await this.imageRepository.create(url)

      this.productImageRepository.create({
        image_id: image.id,
        product_id: product.id
      })

      return image.url
    }))

    return imageUrls
  }

  private async processColors(colors: string[], product: Product) {
    const hexadecimals = await Promise.all(colors.map(async (hexadecimal) => {
      let color = await this.colorRepository.findByHexadecimal(hexadecimal)

      if (!color) {
        color = await this.colorRepository.create(hexadecimal)
      }

      await this.productColorRepository.create({
        color_id: color.id,
        product_id: product.id
      })

      return color.hexadecimal
    }))

    return hexadecimals
  }

  async execute(productData: RegisterProductDTO & { colors?: string[], images: string[] }) {
    const { discount, price } = productData

    if (discount) {
      const calculatedPromotionalPrice = this.calculatePromotionalPrice(price, discount)

      productData.promotionalPrice = "R$" + calculatedPromotionalPrice
    }

    const { promotionalPrice, categoryId, colors, images, ...restData } = productData
    const product = await this.productRepository.create({
      ...restData,
      discount,
      price,
      category_id: categoryId,
      promotional_price: promotionalPrice
    })

    const imageUrls = await this.processImages(images, product)

    if (colors) {
      const hexadecimals = await this.processColors(colors, product)

      return {
        ...product,
        colors: [...hexadecimals],
        images: [...imageUrls]
      }
    }

    return {
      ...product,
      images: [...imageUrls]
    }
  }
}
