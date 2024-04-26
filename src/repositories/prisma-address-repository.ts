import { prisma } from "@/lib/prisma"
import { AddressRepository } from "./interfaces/address-repository"
import { RegisterAddressDTO } from "@/dtos/RegisterAddressDTO"
import { UpdateAddressUserDataType } from "@/types/update-address-user-data"

export class PrismaAddressRepository implements AddressRepository {
  async save(data: RegisterAddressDTO) {
    prisma.address.create({ data })
  }

  async updateData(data: UpdateAddressUserDataType) {
    prisma.address.update({
      where: {
        userId: data.userId
      },
      data
    })
  }

  async findByUserId(userId: string) {
    const address = prisma.address.findUnique({ where: { userId } })

    return address
  }
}
