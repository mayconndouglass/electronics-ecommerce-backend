import { z } from "zod"

export const PaginationProductSchema = () => {
  return z.object({
    page: z
      .string()
      .transform((informedPage) => parseInt(informedPage, 10)),
    limit: z
      .string()
      .transform((informedLimit) => parseInt(informedLimit, 10)),
    category: z
      .string().optional(),
    color: z
      .string().optional(),
    sortby: z
      .enum(["older", "newest", "name", "price"])
      .optional(),
    maxprice: z
      .string()
      .transform((informedMaxPrice) => parseInt(informedMaxPrice, 10))
      .optional()
  })
}
