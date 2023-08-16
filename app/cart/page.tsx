"use client";
import { useShoppingCart } from "use-shopping-cart";
import CartProduct from "../components/CartProduct";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

function CartPage() {
  const {
    cartDetails,
    cartCount,
    formattedTotalPrice,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();
  const [redirecting, setRedirecting] = useState(false);

  async function onCheckout() {
    if (cartCount! <= 0) return;
    try {
      setRedirecting(true);
      const { id } = await axios
        .post("/api/checkout-sessions", cartDetails)
        .then((res) => res.data);
      const result = await redirectToCheckout(id);
      if (result?.error) {
        console.log("Error in result:", result);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setRedirecting(false);
    }
  }

  function getCountry() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = timezone.split("/")[0].replace("_", " ");
    return country;
  }

  return (
    <div className="row wrapper flex flex-col">
      <h2 className="text-3xl font-semibold mb-8 text-center sm:text-left">
        Cart
      </h2>
      {/* Table */}
      {cartCount ? (
        <table className="w-full flex flex-col text-left border-y sm:border-t-0">
          <thead className="w-full">
            <tr className="w-full hidden sm:flex justify-between font-normal pb-3 border-b">
              <th className="table__head table__product">Product</th>
              <th className="table__head table__price">Price</th>
              <th className="table__head table__quantity">Quantity</th>
              <th className="table__head table__subtotal">Subtotal</th>
            </tr>
          </thead>
          <tbody className="flex flex-col divide-y">
            {Object.entries(cartDetails!).map(([productId, product]) => (
              <CartProduct key={productId} product={product} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col">
          <p className="text-center sm:text-left mb-6">
            Your cart is currently empty.
          </p>
          <Link
            href="/books"
            className="h-12 px-12 text-lg text-white bg-lime-500 font-medium leading-none outline-none relative overflow-hidden group mx-auto sm:mx-0 max-w-xs grid place-items-center"
          >
            <div className="absolute inset-0 bg-lime-600 translate-y-[101%] group-hover:translate-y-0 duration-200"></div>
            <span className="relative">Browse books</span>
          </Link>
        </div>
      )}
      {!!cartCount && (
        <div className="ml-auto my-8 divide-y flex flex-col w-full sm:max-w-sm">
          {/* SUBTOTAL */}
          <div className="py-5 flex justify-between">
            <div className="font-normal uppercase text-sm">Subtotal</div>
            <div className="text-lg">
              ${((0.9 * totalPrice!) / 100).toFixed(2)}
            </div>
          </div>
          {/* TAX */}
          <div className="py-5 flex justify-between">
            <div className="font-normal uppercase text-sm">Tax</div>
            <div className="text-lg">
              ${((0.1 * totalPrice!) / 100).toFixed(2)}
            </div>
          </div>
          {/* SHIPPING */}
          <div className="py-5 flex justify-between text-sm sm:text-base">
            <div className="font-normal uppercase text-sm">Shipping</div>
            <div className="flex flex-col gap-1 text-right">
              <div>Free shipping</div>
              <div>
                Shipping to <span className="font-medium">{getCountry()}.</span>
              </div>
            </div>
          </div>
          {/* TOTAL */}
          <div className="py-5 flex justify-between font-semibold">
            <div className="uppercase text-sm">Total</div>
            <div className="text-lg">{formattedTotalPrice?.slice(2)}</div>
          </div>
          <div className="py-5">
            <button
              onClick={onCheckout}
              disabled={redirecting}
              className="w-full h-12 sm:px-12 text-lg text-white bg-lime-500 font-medium leading-none outline-none relative overflow-hidden group grid place-items-center"
            >
              <div className="absolute inset-0 bg-lime-600 translate-y-[101%] group-hover:translate-y-0 duration-200"></div>
              <span className="relative">{
                !redirecting ? 'Proceed to checkout' : 'Redirecting...'
              }</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default CartPage;
