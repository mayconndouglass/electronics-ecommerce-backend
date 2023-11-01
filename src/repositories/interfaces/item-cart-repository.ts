import { RegisterCartItemDTO } from "@/dtos/RegisterCartItemDTO"
import { CartItem } from "@prisma/client"

export interface CartItemRepository {
  create(data: RegisterCartItemDTO): Promise<CartItem>
  fetchAllItemsFromCart(cartId: string): Promise<CartItem[]>
  findById(itemId: string): Promise<CartItem | null>
  removeItem(itemId: string): Promise<void>
  removeAllItems(cartId: string): Promise<void>
  updateQuantity(itemId: string, quantity: number): Promise<CartItem>
}
