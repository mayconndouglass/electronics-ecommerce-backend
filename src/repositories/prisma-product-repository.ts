import { Prisma } from "@prisma/client"
import { ProductRepository } from "./interfaces/product-repository"
import { prisma } from "@/lib/prisma"
import { ProductType } from "@/types/product"
import { ProductTypeTwo } from "@/types/product-type-two"

export class PrismaProductRepository implements ProductRepository {
  async findProductById(id: string) {
    const product: ProductType[] = await prisma.$queryRaw`
      SELECT P.*, C.name AS category_name,
        (
          SELECT json_agg(json_build_object(
            'id', CO.id,
            'hexadecimal',
            CO.hexadecimal
          ))
          FROM product_color PC
          JOIN colors CO ON CO.id = PC.color_id
          WHERE PC.product_id = P.id
        ) AS colors,
        (
          SELECT json_agg(json_build_object('id', I.id, 'url', I.url))
          FROM product_image PI
          JOIN images I ON I.id = PI.image_id
          WHERE PI.product_id = P.id
        ) AS images
      FROM products P
      JOIN categories C ON C.id = P.category_id
      WHERE P.id = ${id};
    `

    if (!product) {
      return null
    }

    return product[0]
  }

  async fetchFeaturedProducts(): Promise<ProductTypeTwo[]> {
    const featuredProducts: ProductTypeTwo[] = await prisma.$queryRaw`
      SELECT p.*,
      (
        SELECT I.url
        FROM product_image PI
        JOIN images I ON I.id = PI.image_id
        WHERE PI.product_id = P.id
        LIMIT 1
      ) AS image_url
      FROM products P
      LIMIT 16
    `

    return featuredProducts
  }

  async fetchAllProductOnsale() {
    const productsOnSale: ProductTypeTwo[] = await prisma.$queryRaw`
      SELECT p.*,
      (
        SELECT I.url
        FROM product_image PI
        JOIN images I ON I.id = PI.image_id
        WHERE PI.product_id = P.id
        LIMIT 1
      ) AS image_url
     FROM products P
     WHERE p.promotional_price IS NOT NULL
     ORDER BY p.discount DESC;
    `

    return productsOnSale
  }

  async fetchAllProducts() {
    const products: ProductType[] = await prisma.$queryRaw`
      SELECT P.*, C.name AS category_name,
        (
          SELECT json_agg(json_build_object('id', CO.id, 'hexadecimal', CO.hexadecimal))
          FROM product_color PC
          JOIN colors CO ON CO.id = PC.color_id
          WHERE PC.product_id = P.id
        ) AS colors,
        (
          SELECT json_agg(json_build_object('id', I.id, 'url', I.url))
          FROM product_image PI
          JOIN images I ON I.id = PI.image_id
          WHERE PI.product_id = P.id
        ) AS images
      FROM products P
      JOIN categories C ON C.id = P.category_id;
    `

    return products
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = await prisma.product.create({ data })

    return product
  }
}
