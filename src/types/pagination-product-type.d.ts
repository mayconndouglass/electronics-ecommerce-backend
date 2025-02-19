type Product = {
  id: string
  name: string
  description: string
  created_at: Date
  price: string
  promotional_price: string | null
  discount: number | null
  category_id: string
  ProductImage: {
    image: {
      url: string
    }
  }[]
}

export type paginationProductType = {
  currentPage: number,
  totalItems: number,
  totalPages: number,
  hasNextPage: boolean,
  hasPrevPage: boolean,
  products: Product[]
}
