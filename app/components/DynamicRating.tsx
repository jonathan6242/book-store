"use client";
import Rating from "./ui/Rating";
import { useRatingStore } from "../(utils)/ratingStore";

function DynamicRating() {
  const rating = useRatingStore((state: any) => state.rating);

  return (
    <>
      {rating !== -1 ? (
        <div className="flex items-center gap-2">
          <Rating
            rating={
              (rating || 0)
            }
            size="large"
          />
          <span className="leading-3 mb-6">{rating.toFixed(1)}</span>
        </div>
      ) : (
        <div className="h-6 w-24 mb-6 animated-bg"></div>
      )}
    </>
  );
}
export default DynamicRating;
