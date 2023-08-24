import stripe from "@/app/(utils)/stripe";
import { NextResponse } from "next/server";
import { Product } from "use-shopping-cart/core";
import { validateCartItems } from "use-shopping-cart/utilities";

export async function POST(request: Request) {
  try {
    // Get products in cart
    const cartDetails = await request.json();

    // Get all products
    const inventory = await stripe.products.list({
      expand: ["data.default_price"],
      limit: 16
    });
    const products = inventory.data.map((product: Product) => ({
      currency: product.default_price.currency,
      id: product.id,
      name: product.name,
      price: product.default_price.unit_amount,
      image: product.images[0]
    }));

    // Validate products in cart with all products
    const lineItems = validateCartItems(products, cartDetails);
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/cart`,
    });

    // Return session with status 200
    return NextResponse.json(session, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { statusCode: 500, message: error.message },
      { status: 500 }
    );
  }
}
