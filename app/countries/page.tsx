import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  let response = await supabase.from("countries").select()
  console.log(response)
  const countries = response?.data;

  return (
    <ul className="my-auto">
      {countries?.map((country) => (
        <li key={country.id}>{country.name}</li>
      ))}
    </ul>
  );
}
