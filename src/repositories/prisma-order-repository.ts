import { prisma } from "@/lib/prisma"
import { OrderReposistory } from "./interfaces/order-repository"
import { RegisterOrderRepositoryDTO } from "@/dtos/RegisterOrderDTO"

export class PrismaOrderRepository implements OrderReposistory {
  async register(data: RegisterOrderRepositoryDTO) {
    await prisma.order.create({ data })
  }
}
