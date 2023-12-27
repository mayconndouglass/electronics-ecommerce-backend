import { CartItemType } from "@/types/type-cart-item"
import { Cart } from "@prisma/client"

export interface CartRepository {
  create(data: { userId: string }): Promise<Cart>
  findById(cartId: string): Promise<Cart | null>
  findByUserId(userId: string): Promise<Cart | null>
  findManyCartItemFromCart(cartId: string): Promise<CartItemType[]>
}
