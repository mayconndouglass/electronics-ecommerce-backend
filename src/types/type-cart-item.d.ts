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

export interface FavoriteItemType {
  product: {
    id: string;
    price: string;
    name: string;
    promotional_price: string | null
    ProductImage: {
      image: {
        url: string
      }
    }[]
  }
}

export type CartItemFrontEndType = {
  id: string,//Esse Id é do produto
  name: string,
  price: string,
  quantity: number,
  imageUrl: string
}

export type FavoriteItemFrontEndType = {
  id: string,
  name: string,
  price: string,
  imageUrl: string
}
