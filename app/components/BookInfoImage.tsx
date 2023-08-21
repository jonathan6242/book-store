"use client";
import { useEffect, useState } from "react";
import { BookProduct } from "../(utils)/types";
import Image from "next/image";
import { toast } from "react-hot-toast";

function BookInfoImage({
  book,
  selected,
}: {
  book: BookProduct;
  selected?: boolean;
}) {
  const originalPrice = book.metadata?.originalPrice;
  const images = book?.images || [];
  const { name, id: productId } = book;
  const [inWishlist, setInWishlist] = useState(false);
  const [cooldown, setCooldown] = useState(false);

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
    <figure
      className={`relative w-full ${
        !selected ? "max-w-sm md:max-w-xs" : "xs:max-w-xs"
      }  lg:max-w-sm shadow-lg flex-shrink-0`}
      data-aos={`${!selected ? "fade-right" : ""}`}
      data-aos-delay="200"
      data-aos-duration="800"
      data-aos-once={true}
    >
      <Image
        src={images[0]}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        style={{ height: "auto", width: "100%" }}
      />
      {originalPrice && <div className="bookmark-lg">Sale!</div>}
      <button
        onClick={toggleWishlist}
        className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full grid place-items-center shadow text-center"
      >
        <i
          className={`${
            inWishlist ? "fa-solid" : "fa-regular"
          } fa-heart leading-9 text-2xl`}
        ></i>
      </button>
    </figure>
  );
}
export default BookInfoImage;
