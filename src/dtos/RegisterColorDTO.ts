import { Prisma } from "@prisma/client"

export class RegisterColorDTO implements Prisma.ColorUncheckedCreateInput {
  id?: string | undefined
  hexadecimal: string
}
