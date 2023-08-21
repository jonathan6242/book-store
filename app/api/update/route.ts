import stripe from "@/app/(utils)/stripe";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId');
  const rating = +searchParams.get('rating')!;

  const product = await stripe.products.update(
    productId,
    {
      metadata: {
        rating: (rating || 0)
      }
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY
    }
  )

  return NextResponse.json({ product })
}