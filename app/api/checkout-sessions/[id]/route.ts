import stripe from "@/app/(utils)/stripe";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string }}) {
  const { id } = params;

  try {
    const session = await stripe.checkout.sessions.retrieve(
      id
    )  
    return NextResponse.json(session, { status: 200 })
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { statusCode: 500, message: error.message },
      { status: 500 }
    );
  }
}