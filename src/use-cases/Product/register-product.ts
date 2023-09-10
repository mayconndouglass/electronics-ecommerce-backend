import { RegisterColorDTO } from "@/dtos/RegisterColorDTO"
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

  async execute(data: RegisterProductDTO & { colors: RegisterColorDTO[] }) {
    const {
      name, description, image, price, promotional_price, discount, category_id, colors
    } = data

    const product = await this.productRepository.create({
      name,
      description,
      image,
      price,
      promotional_price,
      discount,
      category_id
    })

    const colorsAdded = await Promise.all(colors.map(async ({ hexadecimal }) => {
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
}
