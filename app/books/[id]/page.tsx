import { getBook, getRelatedBooks } from "@/app/(utils)/functions";
import stripe from "@/app/(utils)/stripe";
import { BookProduct } from "@/app/(utils)/types";
import Book from "@/app/components/Book";
import BookDescription from "@/app/components/BookDescription";
import BookInfo from "@/app/components/BookInfo";
import BookPageButtons from "@/app/components/BookPageButtons";
import BookPageSkeleton from "@/app/components/(skeletons)/BookPageSkeleton";
import Price from "@/app/components/Price";
import RecommendedBooks from "@/app/components/RecommendedBooks";
import RecommendedBooksSkeleton from "@/app/components/(skeletons)/RecommendedBooksSkeleton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Suspense } from "react";

async function BookPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createServerComponentClient({ cookies });
  let response = await supabase.from("reviews").select().eq("product_id", id);
  const data = response.data as any[]

  console.log(data)

  return (
    <div className="row wrapper">
      <Suspense fallback={<BookPageSkeleton />}>
        <BookInfo id={id} />
      </Suspense>
      <Suspense fallback={<RecommendedBooksSkeleton />}>
        <RecommendedBooks id={id} />
      </Suspense>
      {
        data.map((review) => (
          <li key={review.id}>{review.review}</li>
        ))
      }
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
