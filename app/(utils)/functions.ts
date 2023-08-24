import stripe from './stripe'
import { BookProduct } from './types'
import { cache } from "react"

export const revalidate = 3600
 
export const getBooksLimit = cache(async () => {
  const inventory = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 16
  })
  return inventory.data.sort((a: BookProduct, b: BookProduct) => a.created - b.created).slice(0,8);
})

export const getBooks = cache(async () => {
  const inventory = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 16
  })
  return inventory.data.sort((a: BookProduct, b: BookProduct) => a.created - b.created);
})

export const getBook = async (id: string) => {
  const inventory = await stripe.products.retrieve(id,
  {
    expand: ['default_price']  
  })
  return inventory
}

export const getRelatedBooks = cache(async (id: string) => {
  const inventory = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 16
  })
  return inventory.data.filter((book: BookProduct) => book.id !== id).sort((a: BookProduct, b: BookProduct) => b.metadata.rating - a.metadata.rating).slice(0, 4);
})

export const getDiscountedBooks = cache(async () => {
  const inventory = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 16
  })
  return inventory.data.filter((book: BookProduct) => book.metadata.originalPrice).sort((a: BookProduct, b: BookProduct) => b.created - a.created).slice(0,4);
})
