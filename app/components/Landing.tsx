import Image from "next/image";
import Link from "next/link";

function Landing() {
  return (
    <header
      className="relative h-full max-h-[70vh]"
      data-aos="fade-in"
      data-aos-delay="400"
      data-aos-duration="1000"
    >
      <Image
        src="/landing.jpg"
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        style={{
          minWidth: "100%",
          height: "auto",
          maxHeight: "70vh",
          minHeight: "40vh",
          objectFit: "cover",
        }}
        priority
      />
      <div className="absolute inset-0 bg-black/50"></div>
      {/* Description */}
      <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md sm:max-w-xl md:max-w-2xl text-center text-white px-6 flex flex-col items-center">
        <div className="overflow-hidden">
          <span
            className="uppercase tracking-widest text-sm sm:text-base lg:text-lg font-light inline-block"
            data-aos="slide-up"
            data-aos-delay="1000"
            data-aos-duration="1200"
          >
            Find your favourite books
          </span>
        </div>

        <h2
          className="mt-2 mb-4 sm:mb-8 text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-medium"
          data-aos="fade-in"
          data-aos-delay="1000"
          data-aos-duration="1200"
        >
          The best online book store in Australia.
        </h2>
        <div className="overflow-hidden"></div>
        <Link
          href="/books"
          className="inline-block uppercase tracking-wide text-sm sm:text-base lg:text-lg font-light w-full max-w-[200px] py-2 sm:py-3 border border-white overflow-hidden relative group"
          data-aos="fade-in"
          data-aos-delay="1000"
          data-aos-duration="1200"
        >
          <span className="z-10 group-hover:text-black relative">See more</span>
          <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 duration-300"></div>
        </Link>
      </div>
    </header>
  );
}
export default Landing;
