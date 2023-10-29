import { Prisma } from "@prisma/client"

export class RegisterUserDTO implements Prisma.UserUncheckedCreateInput {
  id?: string | undefined
  name: string
  email: string
  image?: string | null | undefined
  password_hash: string
}
