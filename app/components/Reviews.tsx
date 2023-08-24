"use client";
import { useEffect, useState, useRef } from "react";
import { ReviewType } from "../(utils)/types";
import Review from "./Review";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams, useRouter } from "next/navigation";
import { useRatingStore } from "../(utils)/ratingStore";
import { useCountStore } from "../(utils)/countStore";
import Link from "next/link";

function Reviews() {
  const supabase = createClientComponentClient();
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(false);

  const setRating = useRatingStore((state: any) => state.setRating);
  const { id: productId } = useParams();

  // Load reviews
  useEffect(() => {
    async function getReviews() {
      setLoading(true);
      setRating(-1);
      const { data: reviews, count }: { data: any[] | null; count: any } =
        await supabase
          .from("reviews")
          .select("*", { count: "exact" })
          .eq("product_id", productId)
          .order("date", { ascending: false })
      setReviews(reviews as ReviewType[]);
      setLoading(false);
    }
    getReviews();
  }, []);

  useEffect(() => {
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
          const { data }: { data: any[] | null } = await supabase
            .from("reviews")
            .select("*")
            .eq("product_id", productId)
            .order("date", { ascending: false })
            .range(0, 2);
          setReviews(data as ReviewType[]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  useEffect(() => {
    async function updateRating() {
      const newRating = reviews?.reduce((acc, curr) => acc + +curr.rating, 0) / reviews!.length
      setRating(newRating || 0);
      fetch(`/api/update?productId=${productId}&rating=${newRating}`);
    }
    updateRating();
  }, [reviews])

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col mb-16">
      <h2 className="text-3xl font-semibold mb-6">Reviews ({reviews?.length || 0})</h2>
      {reviews.length ? (
        <div className="flex flex-col gap-8">
          {reviews
            .slice()
            .sort((a: ReviewType, b: ReviewType) => b.date - a.date)
            .slice(0, 3)
            .map((review, index) => (
              <Review review={review} key={index} />
            ))}
          {reviews?.length > 3 && (
            <Link
              href={`/reviews/${productId}`}
              className="text-center py-3 border text-sm font-medium relative group hover:text-white duration-200 overflow-hidden"
            >
              <div className="bg-lime-500 border border-lime-500 duration-200 absolute inset-[-1px] translate-y-[101%] group-hover:translate-y-0"></div>
              <span className="relative">More reviews and ratings</span>
            </Link>
          )}
        </div>
      ) : (
        <p className="leading-loose">There are no reviews yet.</p>
      )}
    </div>
  );
}
export default Reviews;
