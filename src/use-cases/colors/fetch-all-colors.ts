import { ColorRepository } from "@/repositories/interfaces/color-repository"

export class FetchAllColors {
  constructor(private colorRepository: ColorRepository) { }

  execute() {
    const colors = this.colorRepository.fetchAllColors()

    return colors
  }
}
