import { PrismaCartItemRepository } from "@/repositories/prisma-cart-item-repository"
import { PrismaOrderRepository } from "@/repositories/prisma-order-repository"
import { PrismaUserRepository } from "@/repositories/prisma-user-repository"
import { RegisterOrderUseCase } from "../Orders/Register-order"
import { PrismaAddressRepository } from "@/repositories/prisma-address-repository"

export const MakeRegisterOrder = () => {
  const userRepository = new PrismaUserRepository()
  const cartItemReposistory = new PrismaCartItemRepository()
  const addressRepository = new PrismaAddressRepository()
  const orderRepository = new PrismaOrderRepository()

  const registerOrderUseCase = new RegisterOrderUseCase(
    userRepository,
    cartItemReposistory,
    addressRepository,
    orderRepository
  )

  return registerOrderUseCase
}

/* private userRepository: UserRepository,
    private cartItemRepository: CartItemRepository,
    private addressRepository: AddressRepository,
    private orderRepository: OrderReposistory */
