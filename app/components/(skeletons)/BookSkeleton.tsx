function BookSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {/* Book Image */}
      <div className="relative w-full mb-1">
        <div className="pb-[150%] animated-bg"></div>
      </div>
      {/* Book Description */}
      <div className="flex flex-col pb-8">
        {/* Name */}
        <div className="animated-bg h-5 mb-2"></div>
        {/* Author */}
        <div className="animated-bg h-3 mb-3"></div>
        {/* Rating */}
        <div className="animated-bg h-3 w-20"></div>
      </div>
    </div>
  )
}
export default BookSkeleton