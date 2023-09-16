import { RegisterProductDTO } from "@/dtos/RegisterProductDTO"

import { ColorRepository } from "@/repositories/interfaces/color-repository"
import { ProductColorRepository } from "@/repositories/interfaces/product-color-repository"
import { ProductRepository } from "@/repositories/interfaces/product-repository"

export class RegisterProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private colorRepository: ColorRepository,
    private productColorRepository: ProductColorRepository
  ) { }

  async execute(productData: RegisterProductDTO & { colors?: string[] }) {
    const {
      discount,
      price,
      colors,
      categoryId,
      promotionalPrice,
      ...restData
    } = productData

    if (discount) {
      const priceWithoutPercent = price.replace("%", "")
      const calculatedPromotionalPrice = (Number(priceWithoutPercent) * discount) / 100

      productData.promotionalPrice = "$" + calculatedPromotionalPrice
    }

    const product = await this.productRepository.create({
      ...restData,
      discount,
      price,
      category_id: categoryId,
      promotional_price: promotionalPrice
    })

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

        return color
      }))

      return {
        ...product,
        colors: {
          ...colorsAdded
        }
      }
    }

    return {
      ...product,
    }
  }
}
