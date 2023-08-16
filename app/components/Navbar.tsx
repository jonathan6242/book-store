"use client";
import { BookOpenIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";

function Navbar() {
  const { cartCount } = useShoppingCart();

  return (
    <nav className="shadow sticky top-0 z-20 bg-white">
      <div className="row py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <BookOpenIcon className="w-10 h-10 text-lime-500" />
          <h2 className="hidden sm:block text-2xl font-bold">BestBooks</h2>
        </Link>
        {/* Shopping Cart */}
        <Link
          href="/cart"
          className="flex items-center space-x-1 cursor-pointer relative"
        >
          <ShoppingCartIcon className="w-9 h-9 flex-shrink-0" />
          {cartCount! > 0 && (
            <div className="absolute -top-[3px] -right-[8px] w-[22px] h-[22px] text-white bg-lime-500 rounded-full grid place-items-center leading-[22px] text-sm font-semibold">
              {cartCount}
            </div>
          )}
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;
