import { getBook } from "../(utils)/functions";
import BookDescription from "./BookDescription";
import BookInfoImage from "./BookInfoImage";
import BookPageButtons from "./BookPageButtons";
import Price from "./Price";
import Rating from "./Rating";

async function SelectedBook({ id }: { id: string }) {
  const book = await getBook(id);
  const {
    description,
    metadata: { author, rating },
  } = book;
  const originalPrice = book.metadata?.originalPrice;
  const price = book.default_price.unit_amount;

  return (
    <div className="relative flex flex-col max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-center items-start gap-8">
        <BookInfoImage book={book} selected />
        <div className="flex-grow flex flex-col md:w-1/2 text-white md:py-8">
          {/* Title */}
          <h2 className="text-4xl font-semibold mb-4">{book.name}</h2>
          {/* Description */}
          <BookDescription description={description} selected />
          {/* Price */}
          <div className="text-2xl">${(price / 100).toFixed(2)}</div>
          {/* Buttons */}
          <BookPageButtons book={book} selected />
        </div>
      </div>
    </div>
  );
}
export default SelectedBook;
