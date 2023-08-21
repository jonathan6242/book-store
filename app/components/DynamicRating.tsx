"use client";
import Rating from "./ui/Rating";
import { useRatingStore } from "../(utils)/ratingStore";

function DynamicRating() {
  const rating = useRatingStore((state: any) => state.rating);

  return (
    <>
      {rating ? (
        <Rating
          rating={
            rating
          }
          size="large"
        />
      ) : (
        <Rating rating={0} size="large" />
      )}
    </>
  );
}
export default DynamicRating;
