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
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";

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