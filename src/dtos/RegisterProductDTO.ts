export class RegisterProductDTO {
  name: string
  description: string
  image: string
  price: string
  promotionalPrice?: string | null | undefined
  discount?: number | null | undefined
  categoryId: string
}
