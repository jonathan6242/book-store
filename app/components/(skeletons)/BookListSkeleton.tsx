import BookSkeleton from "./BookSkeleton"

function BookListSkeleton() {
  return (
    <div className="row py-16 flex flex-col">
      <h2 className="section__title self-center">All Books</h2>
      <div className="h-[42px] my-6"></div>
      <div className="grid gap-4 lg:gap-8 grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {
          Array.from({length: 8}).map((_, index) => (
            <BookSkeleton key={index} />
          ))
        }
      </div>
    </div>
  )
}
export default BookListSkeleton