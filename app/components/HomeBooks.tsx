import { getBooksLimit } from "../(utils)/functions";
import { BookProduct } from "../(utils)/types";
import Book from "./Book";

async function HomeBooks() {
  const books = await getBooksLimit();

  return (
    <div className="grid gap-4 lg:gap-8 grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
      {books.map((book: BookProduct) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  )
}
export default HomeBooks