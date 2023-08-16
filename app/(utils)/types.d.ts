export interface BookProduct {
  id: string,
  name: string,
  images: string[],
  created: number,
  description: string,

  metadata: {
    author: string,
    rating: number,
    originalPrice: number
  },
  default_price: {
    unit_amount: number,
    id: string
  },
  sku: string
}