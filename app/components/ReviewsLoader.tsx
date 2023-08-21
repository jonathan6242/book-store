import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Reviews from "./Reviews"
import { cookies } from "next/headers";

async function ReviewsLoader({ id }: { id: string }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore
  })
  const { data, count }: { data: any[] | null, count: any } = await supabase.from("reviews").select("*", { count: "exact" }).eq("product_id", id).order('date', { ascending: false });

  return (
    <Reviews reviews={data ?? []} />
  )
}
export default ReviewsLoader