"use client";
import { useLayoutEffect, useRef, useState } from "react";

interface Description {
  scrollHeight: number;
  offsetHeight: number;
}

function BookDescription({
  description,
  selected,
}: {
  description: string;
  selected?: boolean;
}) {
  const [showMore, setShowMore] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const shadowRef = useRef<HTMLParagraphElement>(null);
  const [scrollHeight, setScrollHeight] = useState<number | undefined>(
    descriptionRef?.current?.scrollHeight
  );
  const [offsetHeight, setOffsetHeight] = useState<number | undefined>(
    descriptionRef?.current?.offsetHeight
  );
  const [shadowHeight, setShadowHeight] = useState<number | undefined>(
    shadowRef?.current?.offsetHeight
  );

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const onResize = () => {
    // if (
    //   !isMobile &&
    //   descriptionRef?.current?.scrollHeight! <=
    //     descriptionRef?.current?.offsetHeight!
    // ) {
    //   setShowMore(false);
    // }
    setScrollHeight(descriptionRef?.current?.scrollHeight);
    setOffsetHeight(descriptionRef?.current?.offsetHeight);
    setShadowHeight(shadowRef?.current?.offsetHeight);
  };

  useLayoutEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <div className={`leading-loose mb-6 relative`}>
        <p
          className={`absolute opacity-0 inset-x-0 top-0 ${
            selected ? "line-clamp-6" : "line-clamp-4"
          }`}
          ref={shadowRef}
        >
          {description}
        </p>
        <p
          className={`${
            !showMore ? `${selected ? "line-clamp-6" : "line-clamp-4"}` : ""
          } ${selected ? "text-lightgray" : ""}`}
          ref={descriptionRef}
        >
          {description}
        </p>

        {scrollHeight! > shadowHeight! && (
          <button
            onClick={() => setShowMore(!showMore)}
            className={`text-lime-500 underline underline-offset-4 font-medium`}
          >
            Show {showMore ? "less" : "more"}
          </button>
        )}
      </div>
    </>
  );
}
export default BookDescription;
