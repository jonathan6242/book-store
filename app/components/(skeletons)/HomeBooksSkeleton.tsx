import BookSkeleton from "./BookSkeleton"

function HomeBooksSkeleton() {
  return (
    <div className="grid gap-4 lg:gap-8 grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
      {Array.from({ length: 8 }).map((_, index) => (
        <BookSkeleton key={index} />
      ))}
    </div>
  )
}
export default HomeBooksSkeleton