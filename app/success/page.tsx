"use client";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import { useShoppingCart } from "use-shopping-cart";

function Success() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useShoppingCart();

  const { data, error } = useSWR(
    () => (sessionId ? `/api/checkout-sessions/${sessionId}` : null),
    (url) => axios.get(url).then((res) => res.data),
    {
      onSuccess() {
        console.log(data);
        clearCart();
      },
    }
  );
  const email = data?.customer_details?.email;
  const name = data?.customer_details?.name;

  return (
    <div className="row wrapper h-full grid place-items-center">
      {error ? (
        <>
          <div className="flex flex-col items-center text-center">
            <XCircleIcon className="w-20 h-20 mx-auto flex-shrink-0 text-rose-500 mb-2" />
            <h2 className="text-3xl font-semibold mb-4">Oops...</h2>
            <p className="text-lg">Sorry, something went wrong.</p>
          </div>
        </>
      ) : !data ? (
        <div className="flex flex-col text-center w-full max-w-md">
          <div className="w-[60px] h-[60px] mx-auto flex-shrink-0 my-2.5 rounded-full animated-bg" />
          <h2 className="h-8 mt-4 mb-4 mx-auto w-full animated-bg"></h2>
          <p className="h-8 self-stretch animated-bg"></p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <CheckCircleIcon className="w-20 h-20 mx-auto flex-shrink-0 text-lime-500 mb-2" />
          <h2 className="text-3xl font-semibold mb-4">
            Thank you, {name.split(" ")[0]}!
          </h2>
          <p className="text-lg">
            Check your email{" "}
            <span className="font-medium text-lime-500">{email}</span> for your
            invoice.
          </p>
        </div>
      )}
    </div>
  );
}
export default Success;
