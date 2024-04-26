import { RegisterAddressDTO } from "@/dtos/RegisterAddressDTO"
import { UpdateAddressUserDataType } from "@/types/update-address-user-data"
import { Address } from "@prisma/client"

export interface AddressRepository {
  save(data: RegisterAddressDTO): Promise<void>
  updateData(data: UpdateAddressUserDataType): Promise<void>
  findByUserId(userId: string): Promise<Address | null>
}
