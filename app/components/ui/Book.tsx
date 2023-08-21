"use client";
import Image from "next/image";
import { BookProduct } from "../../(utils)/types";
import {
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Price from "./Price";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect, useState } from "react";
import Rating from "./Rating";
import { useRatingStore } from "@/app/(utils)/ratingStore";

function Book({ book, removeBook }: { book: BookProduct, removeBook?: Function }) {
  const { addItem } = useShoppingCart();
  const {
    name,
    images,
    id: productId,
    metadata: { author, rating },
  } = book;
  const originalPrice = book.metadata?.originalPrice;
  const price = book.default_price.unit_amount;
  const priceId = book.default_price.id;
  const [inWishlist, setInWishlist] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const setRating = useRatingStore((state: any) => state.setRating);

  const addToCart = (e: any) => {
    e.preventDefault();
    const id = toast.loading("Adding 1 item...", {
      position: "bottom-center",
    });
    // Create product from book
    const product = {
      name,
      id: productId,
      price,
      currency: "AUD",
      image: images[0],
      price_id: priceId,
    };
    addItem(product);
    toast.success(`${name} added`, {
      position: "bottom-center",
      id,
    });
  };

  const toggleWishlist = async (e: any) => {
    e.preventDefault();
    if (!cooldown) {
      setCooldown(true);
      let wishlist;
      let message: string = "";
      if (localStorage.getItem("wishlist")) {
        wishlist = JSON.parse(localStorage.getItem("wishlist")!);
        if (wishlist.includes(productId)) {
          wishlist = wishlist.filter((elem: string) => elem !== productId);
          setInWishlist(false);
          message = `${name} removed from wishlist`;
        } else {
          wishlist.push(productId);
          setInWishlist(true);
          message = `${name} added to wishlist`;
        }
      } else {
        wishlist = [productId];
        setInWishlist(true);
        message = `${name} added to wishlist`;
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      toast.success(message, {
        position: "bottom-center",
      });
      setTimeout(() => {
        setCooldown(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("wishlist")) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")!);
      if (wishlist.includes(productId)) {
        setInWishlist(true);
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {/* Book Image */}
      <Link
        href={`/books/${productId}`}
        className="relative w-full pb-[150%] mb-1 shadow hover:shadow-lg duration-200 group"
        onClick={() => setRating(0)}
      >
        <Image
          src={images[0]}
          alt=""
          fill
          priority={name === "Atomic Habits"}
        />
        {/* For Sale */}
        {originalPrice && <div className="bookmark">SALE!</div>}
        <div className="hidden sm:block absolute inset-0 bg-black opacity-0 group-hover:opacity-25 duration-200"></div>
        {/* Add to cart */}
        <div
          onClick={addToCart}
          className="hidden sm:block absolute inset-2 top-auto bg-white text-center text-xs uppercase opacity-0 group-hover:opacity-100 duration-200 shadow px-3 py-3"
        >
          Add to cart
        </div>
        {/* Add to wishlist */}
        <button
          onClick={toggleWishlist}
          className="hidden sm:grid absolute top-3 left-3 w-9 h-9 bg-white rounded-full place-items-center opacity-0 group-hover:opacity-100 duration-200 shadow text-center"
        >
          <i
            className={`${
              inWishlist ? "fa-solid" : "fa-regular"
            } fa-heart leading-9 text-lg`}
          ></i>
        </button>
      </Link>
      {/* Book Description */}
      <div className="flex flex-col pb-4">
        {/* Name */}
        <h3 className="text-lg font-semibold leading-tight mt-1 mb-0.5 line-clamp-3">
          {name}
        </h3>
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
