import { getBooksLimit } from "@/app/(utils)/functions";
import { BookProduct } from "@/app/(utils)/types";
import Book from "./components/ui/Book";
import Landing from "./components/Landing";
import HomeBooks from "./components/HomeBooks";
import { Suspense } from "react";
import HomeBooksSkeleton from "./components/(skeletons)/HomeBooksSkeleton";
import Testimonials from "./components/Testimonials";
import SelectedBook from "./components/SelectedBook";

export const dynamic = 'force-dynamic';

export default async function HomePage() {

  return (
    <div>
      <Landing />
      <section id="books">
        <div className="row wrapper">
          <div className="section__title--wrapper">
            <span className="section__title">Featured Books</span>
          </div>
          <Suspense fallback={<HomeBooksSkeleton />}>
            <HomeBooks />
          </Suspense>
        </div>
      </section>
      {/* Selected Book */}
      <section id="selected" className="relative">
        <div className="absolute inset-0 bg-selected opacity-20"></div>
        <div className="absolute inset-0 bg-lime-800/75"></div>
        <div className="row wrapper">
          <SelectedBook id="prod_OQP5sWstoHHFdI" />
        </div>
      </section>
      {/* Discounted Books */}
      <section id="discounted">
        <div className="row wrapper">
          <div className="section__title--wrapper">
            <span className="section__title">Latest Offers</span>
          </div>
          <Suspense fallback={<HomeBooksSkeleton />}>
            <HomeBooks discounted />
          </Suspense>
        </div>
      </section>
      {/* Testimonials */}
      <section id="testimonials" className="bg-neutral-100">
        <div className="row wrapper">
          <Testimonials />
        </div>
      </section>
      {/* Newsletter */}
      <section id="newsletter">
        <div className="row py-16 text-center flex flex-col items-center">
          {/* Title */}
          <h2 className="text-3xl font-semibold mb-2">Be the first to know.</h2>
          <div className="leading-loose mb-6">
            Sign up to our newsletter to get the latest deals and offers.
          </div>
          <div className="flex flex-col md:flex-row gap-x-2 gap-y-4 w-full max-w-md">
            {/* Email */}
            <input
              className="flex-grow border focus:outline-none p-2 pl-4"
              type="email"
              placeholder="Your email address"
              name=""
              id=""
            />
            {/* Button */}
            <button className="h-12 text-white bg-lime-500 font-medium leading-none outline-none relative overflow-hidden group w-full md:w-32 cursor-not-allowed">
              <div className="absolute inset-0 bg-lime-600 translate-y-[101%] group-hover:translate-y-0 duration-200"></div>
              <span className="relative">Subscribe</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
