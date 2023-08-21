import stripe from "./stripe";

export default async function updateRating(rating: number, productId: string) {
  await stripe.products.update(
    productId,
    {
      metadata: {
        rating: rating
      }
    },
    {
      apiKey: process.env.NEXT_PUBLIC_STRIPE_KEY
    }
  )
}