import stripe from './stripe'
import { BookProduct } from './types'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export const revalidate = 0
 
export const getBooksLimit = async () => {
  const inventory = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 16
  },
  {
    apiKey: process.env.STRIPE_SECRET_KEY
  })
  return inventory.data.sort((a: BookProduct, b: BookProduct) => a.created - b.created).slice(0,8);
}

export const getBooks = async () => {
  const inventory = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 16
  },
  {
    apiKey: process.env.STRIPE_SECRET_KEY
  })
  return inventory.data.sort((a: BookProduct, b: BookProduct) => a.created - b.created);
}

export const getBook = async (id: string) => {
  const inventory = await stripe.products.retrieve(id,
  {
    expand: ['default_price']  
  },
  {
    apiKey: process.env.STRIPE_SECRET_KEY
  })
  return inventory
}

export const getRelatedBooks = async (id: string) => {
  const inventory = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 16
  },
  {
    apiKey: process.env.STRIPE_SECRET_KEY
  })
  return inventory.data.filter((book: BookProduct) => book.id !== id).sort((a: BookProduct, b: BookProduct) => b.metadata.rating - a.metadata.rating).slice(0, 4);
}

export const getDiscountedBooks = async () => {
  const inventory = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 16
  },
  {
    apiKey: process.env.STRIPE_SECRET_KEY
  })
  return inventory.data.filter((book: BookProduct) => book.metadata.originalPrice).sort((a: BookProduct, b: BookProduct) => b.created - a.created).slice(0,4);
}

// Supabase

export const createServerSupabaseClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}

