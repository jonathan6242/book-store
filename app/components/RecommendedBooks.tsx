import { getRelatedBooks } from "../(utils)/functions";
import { BookProduct } from "../(utils)/types";
import Book from "./Book";

async function RecommendedBooks({ id }: { id: string }) {
  const relatedBooks = await getRelatedBooks(id);

  return (
    <>
      {/* Recommended Books */}
      <div className="section__title--wrapper">
        <h2 className="section__title">You may also like</h2>
      </div>
      <div className="grid gap-4 lg:gap-8 grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
        {relatedBooks.map((book: BookProduct) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}
export default RecommendedBooks;
