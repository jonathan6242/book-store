import stripe from "@/app/(utils)/stripe";
import { BookProduct, Database, ReviewType } from "@/app/(utils)/types";
import BookInfo from "@/app/components/BookInfo";
import BookPageSkeleton from "@/app/components/(skeletons)/BookPageSkeleton";
import RecommendedBooks from "@/app/components/RecommendedBooks";
import RecommendedBooksSkeleton from "@/app/components/(skeletons)/RecommendedBooksSkeleton";
import { Suspense } from "react";
import Reviews from "@/app/components/Reviews";
import ReviewForm from "@/app/components/ReviewForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
import ReviewsLoader from "@/app/components/ReviewsLoader";

async function BookPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="row wrapper">
      <Suspense fallback={<BookPageSkeleton />}>
        <BookInfo id={id} />
      </Suspense>
      <Suspense fallback={<RecommendedBooksSkeleton />}>
        <RecommendedBooks id={id} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ReviewsLoader id={id} />
      </Suspense>
      <ReviewForm />
    </div>
  );
}

export async function generateStaticParams() {
  const inventory = await stripe.products.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });
  const paths = inventory.data.map((product: BookProduct) => ({
    id: product.id,
  }));

  return paths;
}

export default BookPage;
