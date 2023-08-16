"use client";
import Image from "next/image";
import { BookProduct } from "../(utils)/types";
import { StarIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Price from "./Price";
import Link from "next/link";
import { toast } from "react-hot-toast"
import { useShoppingCart } from "use-shopping-cart";
import { useEffect } from "react";
import Rating from "./Rating";

function Book({ book }: { book: BookProduct }) {
  const { addItem } = useShoppingCart();
  const {
    name,
    images,
    id: productId,
    metadata: { author, rating },
  } = book;
  const originalPrice = book.metadata?.originalPrice;
  const price = book.default_price.unit_amount;
  const priceId = book.default_price.id

  const addToCart = (e: any) => {
    e.preventDefault();
    const id = toast.loading("Adding 1 item...", {
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
    addItem(product);
    toast.success(`${name} added`, {
      position: 'bottom-center',
      id
    })
  }

  useEffect(() => {
    console.log(book)
  })

  return (
    <div className="flex flex-col gap-2">
      {/* Book Image */}
      <Link
        href={`/books/${productId}`}
        className="relative w-full pb-[150%] mb-1 shadow hover:shadow-lg duration-200 group"
      >
        <Image
          src={images[0]}
          alt=""
          fill
          priority={name === "Atomic Habits"}
        />
        {/* Add To Cart */}
        <div onClick={addToCart} className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full grid place-items-center opacity-0 group-hover:opacity-100 duration-200 shadow">
          <ShoppingCartIcon className="w-6 h-6" />
        </div>
        {/* For Sale */}
        {
          originalPrice && (
            <div className="bookmark">
              SALE!
            </div>
          )
        }
      </Link>
      {/* Book Description */}
      <div className="flex flex-col pb-4">
        {/* Name */}
        <h3 className="text-lg font-semibold leading-tight mt-1 mb-0.5 line-clamp-3">{name}</h3>
        {/* Author */}
        <span className="text-sm mb-2">{author}</span>
        {/* Rating */}
        <Rating rating={rating} size="small" />
        {/* Price */}
        <Price originalPrice={originalPrice} salePrice={price} />
      </div>
    </div>
  );
}
export default Book;
