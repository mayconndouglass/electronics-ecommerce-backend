export class RegisterCartItemDTO {
  id?: string | undefined
  cart_id?: string
  product_id: string
  user_id: string
  quantity: number
  price: string
}
