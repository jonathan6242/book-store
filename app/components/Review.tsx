import { UserCircleIcon } from "@heroicons/react/20/solid"
import { ReviewType } from "../(utils)/types"
import Rating from "./ui/Rating"

function Review({ review }: { review: ReviewType }) {
  return (
    <div className="flex py-2 gap-2">
      {/* Profile */}
      <UserCircleIcon className="text-gray-300 w-16 h-16 -ml-1.5 -mt-1.5" />
      {/* Description */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            {/* Name */}
            <div className="text-xl font-medium mb-0.5">
              {review.name}
            </div>
            {/* Date */}
            <div className="text-sm">
              {new Date(review.date).toLocaleDateString()}
            </div>
          </div>
          <div className="hidden md:block">
            <Rating rating={review.rating} size="xl" />
          </div>
          <div className="md:hidden">
            <Rating rating={review.rating} size="large" />
          </div>
        </div>
        {/* Review */}
        <div className="leading-loose">
          {review.review}
        </div>
      </div>
    </div>
  )
}
export default Review