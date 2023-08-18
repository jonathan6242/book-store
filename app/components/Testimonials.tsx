"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function Testimonials() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const increment = useRef<any>();
  const totalSlides = 3;

  useEffect(() => {
    increment.current = setInterval(nextSlide, 10000)
    return () => {
      clearInterval(increment.current);
    }
  }, [])

  function nextSlide() {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current!;
      if(autoplay) {
        setCurrentSlide(prev => (prev % 3) + 1)
      }
      sliderRef.current.scrollTo({
        left: scrollLeft + clientWidth * ((currentSlide % 3) + 1 - 1),
        behavior: "smooth",
      });
    }
  }

  function stopAutoplay() {
    clearInterval(increment.current);
    setAutoplay(false);
  }

  function handleScroll() {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current!;
      if (scrollLeft === 0) {
        setCurrentSlide(1);
      }
      if (scrollLeft === clientWidth + 16) {
        setCurrentSlide(2);
      }
      if (scrollLeft === 2 * (clientWidth + 16)) {
        setCurrentSlide(3);
      }
      if (scrollLeft === 3 * (clientWidth + 16)) {
        setCurrentSlide(1);
        sliderRef.current!.scrollLeft = 0;
      }
    }
  }

  function handleClick(slideNumber: number) {
    stopAutoplay();
    setCurrentSlide(slideNumber);
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      sliderRef.current.scrollTo({
        left: clientWidth * (slideNumber - 1),
        behavior: "smooth",
      });
    }
  }

  return (
    <>
      {/* Slider */}
      <div
        className="overflow-x-scroll flex snap-x snap-mandatory relative scrollbar-hide space-x-4"
        ref={sliderRef}
        id="myId"
        onScroll={() => handleScroll()}
        onClick={stopAutoplay}
        onTouchStart={stopAutoplay}
      >
        {/* First */}
        <div className="flex flex-col text-center flex-shrink-0 w-full max-w-5xl snap-start">
          {/* Image */}
          <figure className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
            <Image src="/faces/1.jpg" alt="" width={96} height={96} draggable={false} />
          </figure>
          {/* Review */}
          <div className="leading-loose mb-6">
            “So this bookstore is the best of both worlds.
            <br />I get that experience of browsing the shelves, which, as a
            card-carrying nerd, I love a lot.
            But I also know I’m getting what is almost definitely the best price
            possible, thanks to this bookstore.”
          </div>
          {/* Name */}
          <div className="font-semibold">Robert Schmitt</div>
        </div>
        {/* Second */}
        <div className="flex flex-col text-center flex-shrink-0 w-full max-w-5xl snap-start">
          {/* Image */}
          <figure className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 grid place-items-center">
            <Image src="/faces/2.jpg" alt="" width={96} height={96} draggable={false} />
          </figure>
          {/* Review */}
          <div className="leading-loose mb-6">
            “Excellent delivery.
            <br />
            What made the difference for me to buy this product from this store
            were low shipping costs.
            Even though my product was only $15. For another large chain,
            shipping costs were charged below a certain amount.”
          </div>
          {/* Name */}
          <div className="font-semibold">Isabella Morton</div>
        </div>
        {/* Third */}
        <div className="flex flex-col text-center flex-shrink-0 w-full max-w-5xl snap-start">
          {/* Image */}
          <figure className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
            <Image src="/faces/3.jpg" alt="" width={96} height={96} draggable={false} />
          </figure>
          {/* Review */}
          <div className="leading-loose mb-6">
            “Quick & tidy.
            <br />I found many new books in the BestBooks website.
            I ordered some of them and I got the package the next day
            already and neatly. I am super happy with their service and would buy from them again!”
          </div>
          {/* Name */}
          <div className="font-semibold">Harsanyi Zsigmond</div>
        </div>
        {/* First (Duplicate) */}
        <div className="flex flex-col text-center flex-shrink-0 w-full max-w-5xl snap-start">
          {/* Image */}
          <figure className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
            <Image src="/faces/1.jpg" alt="" width={96} height={96} draggable={false} />
          </figure>
          {/* Review */}
          <div className="leading-loose mb-6">
            “So this bookstore is the best of both worlds.
            <br />I get that experience of browsing the shelves, which, as a
            card-carrying nerd, I love a lot.
            But I also know I’m getting what is almost definitely the best price
            possible, thanks to this bookstore.”
          </div>
          {/* Name */}
          <div className="font-semibold">Robert Schmitt</div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-center items-center gap-4 mt-8">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            onClick={() => handleClick(index + 1)}
            className={`w-2.5 h-2.5 ${
              currentSlide === index + 1 ? "bg-black" : "bg-gray-400"
            }`}
            key={index}
          ></button>
        ))}
      </div>
    </>
  );
}
export default Testimonials;
