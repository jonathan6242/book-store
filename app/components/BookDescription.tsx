"use client";
import { useLayoutEffect, useRef, useState } from "react";

interface Description {
  scrollHeight: number,
  offsetHeight: number
}

function BookDescription({ description }: { description: string }) {
  const [showMore, setShowMore] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [scrollHeight, setScrollHeight] = useState<number | undefined>(descriptionRef?.current?.scrollHeight);
  const [offsetHeight, setOffsetHeight] = useState<number | undefined>(descriptionRef?.current?.offsetHeight);

  const onResize = () => {
    if(descriptionRef?.current?.scrollHeight! <= descriptionRef?.current?.offsetHeight!) {
      setShowMore(false)
    }
    setScrollHeight(descriptionRef?.current?.scrollHeight);
    setOffsetHeight(descriptionRef?.current?.offsetHeight);
  }

  useLayoutEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="leading-loose mb-6">
      <p
        className={`${!showMore ? 'line-clamp-4' : ''}`}
        ref={descriptionRef}
      >
        {description}
      </p>
      {
        (scrollHeight! > offsetHeight!) && (
          <button 
            onClick={() => setShowMore(!showMore)}
            className="text-lime-500 underline underline-offset-4 font-medium"
          >
            Show {showMore ? 'less' : 'more'}
          </button>
        )
      }
    </div>
  );
}
export default BookDescription;
