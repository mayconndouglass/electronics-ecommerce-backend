import { CartItemRepository } from "@/repositories/interfaces/cart-item-repository"
import { UserRepository } from "@/repositories/interfaces/user-repository"
import { RegisterOrderClassDTO } from "@/dtos/RegisterOrderDTO"
import { NotAllowedError } from "../errors/not-allowed-error"
import { AddressRepository } from "@/repositories/interfaces/address-repository"
import { RegisterAddressDTO } from "@/dtos/RegisterAddressDTO"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { OrderReposistory } from "@/repositories/interfaces/order-repository"

interface checksAndUpdatesUserDataProps {
  id: string
  cpf: string
  birthdate: Date
  typePerson: string
}

export class RegisterOrderUseCase {
  constructor(
    private userRepository: UserRepository,
    private cartItemRepository: CartItemRepository,
    private addressRepository: AddressRepository,
    private orderRepository: OrderReposistory
  ) { }

  private async checksAndUpdatesUserData(
    { id, cpf, birthdate, typePerson }: checksAndUpdatesUserDataProps
  ) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      //TODO: Testar se por acaso cair nesse problema, se ele vai dar erro ou se eu tenho que usar um try catch na camada superior, provavelmente sim
      throw new NotAllowedError()
    }

    if (user.cpf != cpf) {
      this.userRepository.updateData({ id, cpf })
    }

    if (user.birthdate != birthdate) {
      this.userRepository.updateData({ id, birthdate })
    }

    if (user.person_type != typePerson) {
      this.userRepository.updateData({ id, typePerson })
    }
  }

  private async checksAndUpdatesAddressUserData(data: RegisterAddressDTO) {
    const { userId, ...restData } = data
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotAllowedError()
    }

    const addressExists = await this.addressRepository.findByUserId(userId)

    if (addressExists) {
      //TODO: grandes chances dessa parte está incorreta
      const addressUserDataArray = Object.entries(restData)
        .map(([key, valor]) => {
          return { [key]: valor } as { [key: string]: string | number | [number] }
        })

      console.log(addressUserDataArray)

      const dataToUpdate = addressUserDataArray.reduce((acc, value) => {
        const key = Object.keys(value)[0] as keyof typeof addressExists

        if (addressExists[key] !== value[key]) {
          acc[key] = value[key]
        }

        return acc
      }, {})

      console.log("Address update", dataToUpdate)

      this.addressRepository.updateData(dataToUpdate)
      return
    }

    this.addressRepository.save({ userId, ...restData })
  }

  async execute(data: RegisterOrderClassDTO) {
    const item = await this.cartItemRepository.findById(data.itemId)

    if (!item) {
      throw new ResourceNotFoundError()
    }

    const { userId, cpf, birthdate, typePerson } = data
    //TODO: Aqui falta testar se precisa de try
    await this.checksAndUpdatesUserData({ id: userId, cpf, birthdate, typePerson })

    await this.checksAndUpdatesAddressUserData({
      zipCode: Number(data.zipCode.replace("-", "")),
      street: data.street,
      number: data.houseNumber,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      complement: data.complement,
      userId: data.userId,
      // phones: [...data.phones]
    })

    const { shippingMethod, shippingFee, paymentMethod, totalPayable } = data
    await this.orderRepository.register({
      userId,
      itemId: item.id,
      status: "Processando",
      shippingMethod,
      shippingFee,
      paymentMethod,
      totalPayable
    })

    this.cartItemRepository.removeCartId(item.id)
  }
}
