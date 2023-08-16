"use client";
import { useShoppingCart } from "use-shopping-cart";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { BookProduct } from "../(utils)/types";
import { toast } from "react-hot-toast";

function BookPageButtons({ book }: { book: BookProduct }) {
  const [quantity, setQuantity] = useState<number>(1);
  const {
    name,
    images,
    id: productId,
  } = book;
  const price = book.default_price.unit_amount;
  const priceId = book.default_price.id;
  const { addItem } = useShoppingCart();

  function onAddToCart(event: any) {
    event.preventDefault()
    const id = toast.loading(`Adding ${quantity} item${quantity > 1 ? 's' : ''}...`, {
      position: 'bottom-center'
    })
    // Create product from book
    const product = {
      name,
      id: productId,
      price,
      currency: "AUD",
      image: images[0],
      price_id: priceId
    }
    addItem(product, { count: quantity });
    toast.success(`${quantity} ${book.name} added`, {
      position: 'bottom-center',
      id
    })
  }

  return (
    <div className="flex flex-col items-start xs:flex-row xs:items-stretch gap-4 mt-6 mb-4">
      {/* Quantity */}
      <div className="flex border divide-x">
        <button
          onClick={() => setQuantity((prev) => prev - 1)}
          className="grid place-items-center hover:text-rose-500 hover:bg-rose-500/10 duration-200 w-12"
          disabled={quantity <= 1}
        >
          <MinusSmallIcon className="w-6 h-6 flex-shrink-0" />
        </button>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(+e?.target?.value)}
          className="w-12 h-12 text-center text-lg focus:outline-none"
          min={1}
        ></input>
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="grid place-items-center hover:text-lime-500 hover:bg-lime-500/10 duration-200 w-12"
        >
          <PlusSmallIcon className="w-6 h-6 flex-shrink-0" />
        </button>
      </div>
      {/* Add to cart */}
      <button onClick={onAddToCart} className="h-12 px-12 text-lg text-white bg-lime-500 font-medium leading-none outline-none relative overflow-hidden group w-full xs:w-auto">
        <div className="absolute inset-0 bg-lime-600 translate-y-[101%] group-hover:translate-y-0 duration-200"></div>
        <span className="relative">Add to cart</span>
      </button>
    </div>
  );
}

export default BookPageButtons;
