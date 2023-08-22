import { Suspense } from "react"
import BooksPage from "../components/(pages)/BooksPage"
import BookListSkeleton from "../components/(skeletons)/BookListSkeleton"

export const dynamic = 'force-dynamic'

function BooksPageLoader() {
  return (
    <Suspense fallback={<BookListSkeleton name="All Books" />}>
      <BooksPage name="All Books" />
    </Suspense>
  )
}
export default BooksPageLoader