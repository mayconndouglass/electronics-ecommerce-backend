export class RegisterOrderClassDTO {
  userId: string
  itemId: string
  status: string
  shippingMethod: string
  shippingFee: string
  paymentMethod: string
  totalPayable: string

  cpf: string
  birthdate: Date
  typePerson: string

  zipCode: string
  street: string
  houseNumber: number
  state: string
  city: string
  neighborhood: string
  complement: string
  phones: number[]
}

export class RegisterOrderRepositoryDTO {
  userId: string
  itemId: string
  status: string
  shippingMethod: string
  shippingFee: string
  paymentMethod: string
  totalPayable: string
}
