import BookInfo from "@/app/components/BookInfo";
import BookPageSkeleton from "@/app/components/(skeletons)/BookPageSkeleton";
import RecommendedBooks from "@/app/components/RecommendedBooks";
import RecommendedBooksSkeleton from "@/app/components/(skeletons)/RecommendedBooksSkeleton";
import { Suspense } from "react";
import ReviewForm from "@/app/components/ReviewForm";
import Reviews from "@/app/components/Reviews";
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
      <Reviews />
      <ReviewForm />
    </div>
  );
}

export default BookPage;
