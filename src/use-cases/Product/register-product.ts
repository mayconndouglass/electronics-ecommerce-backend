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

  private normalizeValue(value: string) {
    return Number(value.trim().replace("R$", "").replace(",", "").replace(".", ""))
  }

  private formatCurrency(value: number) {
    const formattedValue = (value / 100)
      .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

    return formattedValue
  }

  private calculatePromotionalPrice(price: string, discount: number) {
    const priceValue = this.normalizeValue(price)
    const calculatedPromotionalPrice = (priceValue - (priceValue * (discount / 100)))
    const formatedPromotionalPrice = this.formatCurrency(calculatedPromotionalPrice)

    return formatedPromotionalPrice
  }

  private calculateDiscount(price: string, promotionalPrice: string) {
    const priceValue = this.normalizeValue(price)
    const promotionalPriceValue = this.normalizeValue(promotionalPrice)
    const calculedDiscount = (priceValue - promotionalPriceValue) / priceValue * 100

    return Math.ceil(calculedDiscount)
  }

  private async storeImagesInDatabase(urls: string[], product: Product) {
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

  private async storeColorsInDatabase(colors: string[], product: Product) {
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
    const { price, categoryId, colors, images, ...restData } = productData
    let { discount, promotionalPrice } = productData

    if (discount) {
      promotionalPrice = this.calculatePromotionalPrice(price, discount)
    }

    if (promotionalPrice) {
      discount = this.calculateDiscount(price, promotionalPrice)
    }

    const product = await this.productRepository.create({
      name: restData.name,
      description: restData.description,
      discount,
      price,
      category_id: categoryId,
      promotional_price: promotionalPrice
    })

    const imageUrls = await this.storeImagesInDatabase(images, product)

    if (colors) {
      const hexadecimals = await this.storeColorsInDatabase(colors, product)

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
