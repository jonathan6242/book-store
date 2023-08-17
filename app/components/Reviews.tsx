import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function Reviews({ id }: { id: string }) {
  const supabase = createServerComponentClient({ cookies });
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
