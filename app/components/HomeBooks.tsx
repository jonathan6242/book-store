import { getBooksLimit, getDiscountedBooks } from "../(utils)/functions";
import { BookProduct } from "../(utils)/types";
import Book from "./Book";

async function HomeBooks({ discounted }: { discounted?: boolean }) {
  let books;
  books = !discounted ? await getBooksLimit() : await getDiscountedBooks()

  return (
    <div className="grid gap-4 lg:gap-8 grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
      {books.map((book: BookProduct) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  )
}
export default HomeBooks