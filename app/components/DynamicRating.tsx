"use client";
import Rating from "./ui/Rating";
import { useRatingStore } from "../(utils)/ratingStore";

function DynamicRating() {
  const rating = useRatingStore((state: any) => state.rating);

  return (
    <>
      {rating !== -1 ? (
        <Rating
          rating={
            (rating || 0)
          }
          size="large"
        />
      ) : (
        <div className="h-6 w-24 mb-6 animated-bg"></div>
      )}
    </>
  );
}
export default DynamicRating;
