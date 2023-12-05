export type CartItemType = {
  quantity: number
  price: string
  product: {
    id: string
    name: string
    price: string
    promotional_price: string
    ProductImage: [
      {
        image: {
          url: string
        }
      }
    ]
  }
}
