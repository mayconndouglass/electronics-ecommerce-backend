import { Prisma } from "@prisma/client"
import { ProductRepository } from "./interfaces/product-repository"
import { prisma } from "@/lib/prisma"
import { ProductType } from "@/types/product"
import { ProductTypeTwo } from "@/types/product-type-two"
import { paginationProductType } from "@/types/pagination-product-type"

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

  async pagination(
    page: number,
    limit: number,
    orderBy?: "older" | "newest" | "name" | "price",
    categoryId?: string,
    color?: string,
    maxPrice?: number
  ): Promise<paginationProductType> {
    const sortByOptions = {
      older: "created_at",
      newest: "created_at",
      name: "name",
      price: "price_num",
    }

    const sortBy = orderBy ? sortByOptions[orderBy] : "name"
    const sortOrder = orderBy === "newest" ? "desc" : "asc"
    
    const totalItems = await prisma.product.count({
      where: {
        category_id: categoryId || undefined,
        ProductColor: color ? { some: { color_id: color } } : undefined,
        price_num: maxPrice ? { lte: maxPrice } : undefined
      }
    })
  
    const products = await prisma.product.findMany({
      where: {
        category_id: categoryId || undefined,
        ProductColor: color ? { some: { color_id: color } } : undefined,
        price_num: maxPrice ? { lte: maxPrice } : undefined,
      },
      include: {
        ProductImage: {
          select: {
            image: { select: { url: true } },
          },
          take: 1,
        },
      },
      orderBy: {
        [sortBy]: sortOrder
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const totalPages = Math.ceil(totalItems / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1
  
    return {
      currentPage: page,
      totalPages,
      totalItems,
      hasNextPage,
      hasPrevPage,
      products
    }
  }
}
