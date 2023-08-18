"use client";
import { useEffect, useState } from "react";
import { BookProduct } from "../(utils)/types";
import Book from "./Book";
import Select from "./Select";
import Pagination from "./Pagination";
import Link from "next/link";

function BookList({
  books: initialBooks,
  name,
  removeBook,
}: {
  books: BookProduct[];
  name: string;
  removeBook?: Function;
}) {
  const [books, setBooks] = useState<BookProduct[]>(initialBooks);
  const booksPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(initialBooks?.length / booksPerPage);

  useEffect(() => {
    setBooks(initialBooks);
  }, [initialBooks]);

  if (!!books && !books.length && name === "Wishlist") {
    return (
      <div className="row py-16 flex flex-col">
        <div className="section__title--wrapper">
          <h2 className="section__title self-center">{name}</h2>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center sm:text-left mb-6">
            Your wishlist is currently empty.
          </p>
          <Link
            href="/books"
            className="h-12 px-12 text-lg text-white bg-lime-500 font-medium leading-none outline-none relative overflow-hidden group mx-auto sm:mx-0 max-w-xs grid place-items-center"
          >
            <div className="absolute inset-0 bg-lime-600 translate-y-[101%] group-hover:translate-y-0 duration-200"></div>
            <span className="relative">Browse books</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="row py-16 flex flex-col">
      <div className="section__title--wrapper">
        <h2 className="section__title self-center">{name}</h2>
      </div>
      {/* Header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="text-sm">
          Showing{" "}
          <span className="font-medium">
            {booksPerPage * (currentPage - 1) + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(booksPerPage * currentPage, books?.length) || 0}
          </span>{" "}
          of{" "}
          <span className="font-medium">
            {Math.min(totalPages * booksPerPage, books?.length) || 0}
          </span>{" "}
          results
        </div>
        {/* Select Menu */}
        <Select
          books={books}
          setBooks={setBooks}
          setCurrentPage={setCurrentPage}
        />
      </header>
      <div className="grid gap-4 lg:gap-8 grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mb-8">
        {books
          ?.slice(booksPerPage * (currentPage - 1), booksPerPage * currentPage)
          .map((book: BookProduct) => (
            <Book key={book.id} book={book} removeBook={removeBook} />
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
export default BookList;
