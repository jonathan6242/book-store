import { getBooksLimit } from "@/app/(utils)/functions";
import { BookProduct } from "@/app/(utils)/types";
import Book from "./components/Book";
import Landing from "./components/Landing";
import HomeBooks from "./components/HomeBooks";
import { Suspense } from "react";
import HomeBooksSkeleton from "./components/(skeletons)/HomeBooksSkeleton";
import Testimonials from "./components/Testimonials";
import SelectedBook from "./components/SelectedBook";

export default async function HomePage() {
  return (
    <div>
      <Landing />
      <section id="books">
        <div className="row wrapper">
          <div className="section__title--wrapper">
            <span className="section__title">Latest Books</span>
          </div>
          <Suspense fallback={<HomeBooksSkeleton />}>
            <HomeBooks />
          </Suspense>
        </div>
      </section>
      {/* Selected Book */}
      <section
        id="selected"
        className="relative"
      >
        <div className="absolute inset-0 bg-selected opacity-20"></div>
        <div className="absolute inset-0 bg-lime-800/75"></div>
        <div className="row wrapper">
          <SelectedBook id="prod_OQP5sWstoHHFdI" />
        </div>
      </section>
      {/* Discounted Books */}
      {/* Testimonials */}
      {/* Newsletter */}
    </div>
  );
}
