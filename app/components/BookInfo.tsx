import Image from "next/image";
import { getBook } from "../(utils)/functions";
import { StarIcon } from "@heroicons/react/24/solid";
import BookDescription from "./BookDescription";
import Price from "./Price";
import BookPageButtons from "./BookPageButtons";
import Rating from "./Rating";
import { HeartIcon } from "@heroicons/react/24/outline";
import BookInfoImage from "./BookInfoImage";

async function BookInfo({ id }: { id: string }) {
  const book = await getBook(id);
  const {
    description,
    metadata: { author, rating },
  } = book;
  const originalPrice = book.metadata?.originalPrice;
  const price = book.default_price.unit_amount;

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
      {/* Book Image */}
      <BookInfoImage book={book} />
      {/* Book Description */}
      <div className="flex-grow flex flex-col md:w-1/2">
        {/* Title */}
        <h2 className="text-3xl font-semibold mb-1">{book.name}</h2>
        {/* Author */}
        <div className="text-xl mb-2">{author}</div>
        {/* Rating */}
        <Rating rating={rating} size="large" />
        {/* Description */}
        <BookDescription description={description} />
        {/* Price */}
        <Price originalPrice={originalPrice} salePrice={price} large />
        {/* Buttons */}
        <BookPageButtons book={book} />
        {/* In stock */}
        <div className="flex items-center space-x-3 group self-start">
          <div className="w-3 h-3 bg-lime-500 rounded-full group-hover:animate-ping"></div>
          <span className="text-sm">50+ in stock</span>
        </div>
      </div>
    </div>
  );
}
export default BookInfo;
