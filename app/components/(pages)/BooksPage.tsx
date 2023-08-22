import { getBooks } from "../../(utils)/functions"
import BookList from "../BookList"

export const dynamic = 'force-dynamic'
export const revalidate = 0;

async function BooksPage({ name } : { name: string }) {
  const books = await getBooks();

  return (
    <BookList books={books} name={name} />
  )
}
export default BooksPage