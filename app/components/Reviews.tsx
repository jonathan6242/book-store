import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
})

async function Reviews({ id }: { id: string }) {
  const supabase = createServerSupabaseClient()
  let response = await supabase.from("reviews").select().eq("product_id", id);
  const data = response.data as any[];

  console.log(data);
  return <>
    {
      data.map((review) => (
        <li key={review.id}>{review.name}</li>
      ))
    }
  </>;
}
export default Reviews;
