import { CartItem } from "@prisma/client"
import { RegisterCartItemDTO } from "@/dtos/RegisterCartItemDTO"

export interface CartItemRepository {
  create(data: RegisterCartItemDTO): Promise<CartItem>
  findById(itemId: string): Promise<CartItem | null>
  findByProductId(userId: string, productId: string): Promise<CartItem | null>
  findByCartIdAndProductId(
    cartId: string, productId: string
  ): Promise<CartItem | null>
  removeItem(itemId: string): Promise<void>
  removeAllItems(cartId: string): Promise<void>
  updateQuantity(
    itemId: string,
    quantity: number,
    price: string
  ): Promise<CartItem>
  removeCartId(itemId: string): Promise<void>
}
