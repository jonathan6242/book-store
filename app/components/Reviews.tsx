"use client";
import { useEffect, useState } from "react";
import { ReviewType } from "../(utils)/types";
import Review from "./Review";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams, useRouter } from "next/navigation";
import { useRatingStore } from "../(utils)/ratingStore";

function Reviews({ reviews: serverReviews }: { reviews: ReviewType[] }) {
  const supabase = createClientComponentClient();
  const [reviews, setReviews] = useState(serverReviews);
  const setRating = useRatingStore((state: any) => state.setRating);
  const { id: productId } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function updateRating() {
      const newRating = reviews?.reduce((acc, curr) => acc + +curr.rating, 0) / reviews!.length
      fetch(`/api/update?productId=${productId}&rating=${newRating}`);
      router.refresh();
    }
    updateRating();
  }, [reviews]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
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
      .subscribe();

    setRating(
      reviews?.reduce((acc, curr) => acc + +curr.rating, 0) / reviews!.length
    );

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="flex flex-col mb-16">
      <h2 className="text-3xl font-semibold mb-6">Reviews</h2>
      {reviews.length ? (
        <div className="flex flex-col gap-8">
          {reviews
            .slice()
            .sort((a: ReviewType, b: ReviewType) => b.date - a.date)
            .map((review, index) => (
              <Review review={review} key={index} />
            ))}
        </div>
      ) : (
        <p className="leading-loose">There are no reviews yet.</p>
      )}
    </div>
  );
}
export default Reviews;
