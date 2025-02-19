export class ProductPaginationDTO {
  page: number
  limit: number
  category?: string
  color?: string
  orderBy?: "older" | "newest" | "name" | "price"
  maxPrice?: number
}
