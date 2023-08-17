import { getBooks } from "../../(utils)/functions"
import BookList from "../BookList"

async function BooksPage({ name } : { name: string }) {
  const books = await getBooks();

  return (
    <BookList books={books} name={name} />
  )
}
export default BooksPage