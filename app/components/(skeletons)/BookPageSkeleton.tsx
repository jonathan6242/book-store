import BookSkeleton from "./BookSkeleton"

function BookPageSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
      {/* Book Image */}
      <figure className="relative w-full max-w-sm md:max-w-xs lg:max-w-sm shadow-lg flex-shrink-0">
        <div className="pb-[150%] animated-bg"></div>
      </figure>
      {/* Book Description */}
      <div className="flex-grow flex flex-col md:w-1/2">
        {/* Title */}
        <h2 className="h-8 w-72 mb-3 animated-bg"></h2>
        {/* Author */}
        <div className="h-6 w-56 mb-3 animated-bg"></div>
        {/* Rating */}
        <div className="h-4 w-24 mb-6 animated-bg"></div>
        {/* Description */}
        <div className="leading-loose mb-6 text-transparent line-clamp-5 animated-bg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero esse odio, laudantium quo eos numquam amet autem sed rerum. Eius voluptatibus, ut sunt, cum pariatur rerum nesciunt, blanditiis quas delectus praesentium sit similique? Repellat dicta cupiditate commodi placeat quidem dolorum corrupti ipsam delectus quae ullam? Expedita est dolorem tenetur autem.
        </div>
        {/* Price */}
        <div className="h-6 animated-bg">&nbsp;</div>
        {/* Buttons */}
        <div className="h-12 mt-6 mb-4 animated-bg"></div>
      </div>
    </div>
  )
}
export default BookPageSkeleton