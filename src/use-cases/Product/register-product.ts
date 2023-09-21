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

  async execute(productData: RegisterProductDTO & { colors?: string[], images: string[] }) {
    const { discount, price } = productData

    if (discount) {
      const priceValue = Number(price.trim().replace("R$", ""))
      const calculatedPromotionalPrice =
        (priceValue - (priceValue * discount) / 100).toFixed(2)

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

    const imageUrls = await Promise.all(images.map(async (image) => {
      const imageUrl = await this.imageRepository.create(image)

      this.productImageRepository.create({
        image_id: imageUrl.id,
        product_id: product.id
      })

      return imageUrl.url
    }))

    if (colors) {
      const colorsAdded = await Promise.all(colors.map(async (hexadecimal) => {
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

      return {
        ...product,
        colors: [
          ...colorsAdded
        ],
        images: [...imageUrls]
      }
    }

    return {
      ...product,
      images: [...imageUrls]
    }
  }
}
