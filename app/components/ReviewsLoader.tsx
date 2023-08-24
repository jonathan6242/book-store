import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Reviews from "./Reviews";

export const dynamic = 'force-dynamic';

async function ReviewsLoader({ id }: { id: string }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: reviews }: { data: any[] | null; count: any } =
    await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", id)
      .order("date", { ascending: false })
  const rating = (reviews?.reduce((acc, curr) => acc + curr.rating) / (reviews?.length || 1))

  return (
    <></>
    // <Reviews reviews={reviews} rating={rating} />
  )
}
export default ReviewsLoader