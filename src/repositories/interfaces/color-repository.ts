import { Color } from "@prisma/client"

export interface ColorRepository {
  create(hexadecimal: string): Promise<Color>
  findByHexadecimal(hexadecimal: string): Promise<Color> | null
}
