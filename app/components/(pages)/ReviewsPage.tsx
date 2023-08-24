"use client";
import { useCountStore } from "@/app/(utils)/countStore";
import { ReviewType } from "@/app/(utils)/types";
import Review from "@/app/components/Review";
import ReviewForm from "@/app/components/ReviewForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function ReviewsPage({ name }: { name: string }) {
  const booksPerPage = 4;

  const supabase = createClientComponentClient();
  const { id: productId } = useParams();
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(0);

  async function getReviews() {
    const from = pages * booksPerPage;
    const to = from + (booksPerPage - 1);
    const { data, count: initialCount }: { data: any[] | null; count: any } =
      await supabase
        .from("reviews")
        .select("*", { count: "exact" })
        .eq("product_id", productId)
        .order("date", { ascending: false })
        .range(from, to);
    console.log('from', from, 'to', to)
    if (pages > 0) {
      setReviews((prev) => [...prev!, ...data!]);
    } else {
      setReviews(data || []);
    }
    setCount(initialCount);
    setLoading(false);
  }

  useEffect(() => {
    getReviews();
    const channel = supabase
      .channel("insert and delete review")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "reviews",
        },
        (payload) => {
          setCount(prev => prev + 1);
          setReviews((prev) => [...prev, payload.new as ReviewType]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "reviews",
        },
        async () => {
          const from = pages * booksPerPage;
          const to = from + (booksPerPage - 1);
          setCount(prev => prev - 1);
          const { data }: { data: any[] | null } = await supabase
            .from("reviews")
            .select("*")
            .eq("product_id", productId)
            .order("date", { ascending: false })
            .range(0, to);
          setReviews(data as ReviewType[]);
        }
      )
      .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
  }, []);

  async function loadMoreReviews() {
    setPages((prev) => prev + 1);
  }

  useEffect(() => {
    getReviews();
  }, [pages])

  if(loading) {
    return (
      <div className="row wrapper">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="row wrapper">
      <div className="flex flex-col mb-16">
        <h2 className="text-3xl font-semibold mb-6">Reviews for {name} ({count})</h2>
        {reviews?.length ? (
          <div className="flex flex-col gap-8">
            {reviews!
              .slice()
              .sort((a: ReviewType, b: ReviewType) => b.date - a.date)
              .slice(0, (pages * booksPerPage) + (booksPerPage))
              .map((review, index) => (
                <Review review={review} key={index} />
              ))}
            {reviews?.length < count && (
              <button
                onClick={loadMoreReviews}
                className="text-center py-3 border text-sm font-medium relative group hover:text-white duration-200 overflow-hidden"
              >
                <div className="bg-lime-500 border border-lime-500 duration-200 absolute inset-[-1px] translate-y-[101%] group-hover:translate-y-0"></div>
                <span className="relative">Load more reviews</span>
              </button>
            )}
          </div>
        ) : (
          <p className="leading-loose">There are no reviews yet.</p>
        )}
      </div>
      <ReviewForm />
    </div>
  );
}
export default ReviewsPage;
