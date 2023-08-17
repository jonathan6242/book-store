"use client";
import { useEffect, useState } from "react";
import { getBooks } from "../../(utils)/functions";
import BookList from "../BookList";
import { BookProduct } from "@/app/(utils)/types";
import BookListSkeleton from "../(skeletons)/BookListSkeleton";

function Wishlist({ books }: { books: BookProduct[] }) {
  const [wishlistBooks, setWishlistBooks] = useState<BookProduct[]>(
    []
  );

  function removeBook(productId: string) {
    setWishlistBooks(prev => prev.filter(book => book.id !== productId));
  }

  useEffect(() => {
    async function main() {
      let wishlist: string[] = [];
      if (localStorage.getItem("wishlist")) {
        wishlist = JSON.parse(localStorage.getItem("wishlist")!);
      } else {
        wishlist = [];
      }
      setWishlistBooks(books.slice().filter((book) => wishlist.includes(book.id)));
    }
    if(books) {
      main();
    }
  }, [books]);

  return <BookList books={wishlistBooks} name="Wishlist" removeBook={removeBook} />;
}
export default Wishlist;
