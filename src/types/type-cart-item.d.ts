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

export type CartItemFrontEndType = {
  id: string,//Esse Id é do produto
  name: string,
  price: string,
  quantity: number,
  imageUrl: string
}
