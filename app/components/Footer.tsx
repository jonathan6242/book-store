import { BookOpenIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="row py-16 flex flex-col items-center gap-6">
        {/* Logo */}
        <Link href='/' className="flex items-center space-x-2 text-white">
          <BookOpenIcon className="w-10 h-10 -my-4" />
          <h2 className="hidden sm:block text-2xl font-bold">
            BestBooks
          </h2>
        </Link>
        {/* Links */}
        <div className="flex items-center gap-8">
          <Link href='/' className="hover:underline underline-offset-4">Home</Link>
          <Link href='/' className="cursor-not-allowed">About</Link>
          <Link href='/books' className="hover:underline underline-offset-4">Books</Link>
          <Link href='/cart' className="hover:underline underline-offset-4">Cart</Link>
        </div>
        {/* Copyright */}
        <div className="text-sm">
          Copyright &copy; {new Date().getUTCFullYear()} BestBooks
        </div>
      </div>
    </footer>
  )
}
export default Footer