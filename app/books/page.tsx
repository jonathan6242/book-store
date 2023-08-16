import { Suspense } from "react"
import BooksPage from "../components/(pages)/BooksPage"
import BookListSkeleton from "../components/(skeletons)/BookListSkeleton"

function BooksPageLoader() {
  return (
    <Suspense fallback={<BookListSkeleton />}>
      <BooksPage />
    </Suspense>
  )
}
export default BooksPageLoader