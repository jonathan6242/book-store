import { getBooksLimit } from "@/app/(utils)/functions";
import { BookProduct } from "@/app/(utils)/types";
import Book from "./components/Book";
import Landing from "./components/Landing";
import HomeBooks from "./components/HomeBooks";
import { Suspense } from "react";
import HomeBooksSkeleton from "./components/(skeletons)/HomeBooksSkeleton";
import Testimonials from "./components/Testimonials";

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
      <Testimonials />
    </div>
  );
}
