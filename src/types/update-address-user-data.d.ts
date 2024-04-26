export interface UpdateAddressUserDataType {
  userId?: string
  zipCode?: number
  street?: string
  number?: number
  state?: string
  city?: string
  neighborhood?: string
  complement?: string
  phones?: [
    phoneNumber?: number
  ]
}
