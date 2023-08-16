import BookSkeleton from "./BookSkeleton";

function RecommendedBooksSkeleton() {
  return (
    <>
      {/* Recommended Books */}
      <div className="section__title--wrapper">
        <h2 className="section__title">You may also like</h2>
      </div>
      <div className="grid gap-4 lg:gap-8 grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
        {Array.from({ length: 4 }).map((_, index) => (
          <BookSkeleton key={index} />
        ))}
      </div>
    </>
  );
}
export default RecommendedBooksSkeleton;
