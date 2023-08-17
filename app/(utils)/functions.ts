import { ReactNode, cache } from 'react'
import stripe from './stripe'
import { BookProduct } from './types'
import { cookies } from 'next/headers'

 
export const revalidate = 3600
// await new Promise((res) => setTimeout(res, 2000))
 
export const getBooksLimit = cache(async () => {
  const inventory = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 16
  },
  {
    apiKey: process.env.STRIPE_SECRET_KEY
  })
  return inventory.data.sort((a: BookProduct, b: BookProduct) => a.created - b.created).slice(0,8);
})

export const getBooks = cache(async () => {
  const inventory = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 16
  },
  {
    apiKey: process.env.STRIPE_SECRET_KEY
  })
  return inventory.data.sort((a: BookProduct, b: BookProduct) => a.created - b.created);
})

export const getBook = cache(async (id: string) => {
  const inventory = await stripe.products.retrieve(id,
  {
    expand: ['default_price']  
  },
  {
    apiKey: process.env.STRIPE_SECRET_KEY
  })
  return inventory
})

export const getRelatedBooks = cache(async (id: string) => {
  const inventory = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 16
  },
  {
    apiKey: process.env.STRIPE_SECRET_KEY
  })
  return inventory.data.filter((book: BookProduct) => book.id !== id).sort((a: BookProduct, b: BookProduct) => b.metadata.rating - a.metadata.rating).slice(0, 4);
})

