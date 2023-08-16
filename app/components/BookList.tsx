'use client'
import { useState } from "react";
import { BookProduct } from "../(utils)/types"
import Book from "./Book"
import Select from "./Select"

function BookList({ books: initialBooks, name }: { books: BookProduct[], name: string }) {
  const [books, setBooks] = useState<BookProduct[]>(initialBooks);

  return (
    <div className="row py-16 flex flex-col">
      <h2 className="section__title self-center">{name}</h2>
      {/* Header */}
      <header className="flex items-center justify-between my-6">
        <span className="tracking-normal text-lg">
          {books?.length || 0} results
        </span>
        {/* Select Menu */}
        <Select books={books} setBooks={setBooks} />
      </header>
  

      <div className="grid gap-4 lg:gap-8 grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {books?.map((book: BookProduct) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
export default BookList