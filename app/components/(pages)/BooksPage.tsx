import { getBooks } from "../../(utils)/functions"
import BookList from "../BookList"

async function BooksPage() {
  const books = await getBooks();

  return (
    <BookList books={books} name="All Books" />
  )
}
export default BooksPage