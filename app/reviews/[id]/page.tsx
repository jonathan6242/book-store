import { getBook } from "@/app/(utils)/functions"
import ReviewsPage from "@/app/components/(pages)/ReviewsPage";

async function Page({ params: { id }}: { params: { id: string }}) {
  const book = await getBook(id);
  return (
    <ReviewsPage name={book.name} />
  )
}
export default Page