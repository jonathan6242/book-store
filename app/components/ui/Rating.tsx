import React from "react";

function Rating({ rating, size }: { rating: number; size: string }) {
  const ratingDecimal = rating - Math.floor(rating);

  if(size === "xl") {
    return (
      <div className="flex items-center text-yellow-400 mb-6 py-1 gap-x-1">
        {Array.from({ length: Math.floor(rating) }).map((_, index) => (
          <i className="fa-solid fa-star text-lg" key={index}></i>
        ))}
        {!Number.isInteger(+rating) ? (
          <>
            {ratingDecimal < 0.25 ? (
              <i className="fa-regular fa-star text-lg"></i>
            ) : ratingDecimal < 0.75 ? (
              <i className="fa-solid fa-star-half-alt text-lg"></i>
            ) : (
              <i className="fa-solid fa-star text-lg"></i>
            )}
            {Array.from({ length: 5 - Math.ceil(rating) }).map((_, index) => (
              <i className="fa-regular fa-star text-lg" key={index}></i>
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: 5 - Math.floor(rating) }).map((_, index) => (
              <i className="fa-regular fa-star text-lg" key={index}></i>
            ))}
          </>
        )}
      </div>
    );
  }

  if (size === "large") {
    return (
      <div className="flex items-center text-yellow-400 mb-6 py-1 gap-x-0.5">
        {Array.from({ length: Math.floor(rating) }).map((_, index) => (
          <i className="fa-solid fa-star text-base" key={index}></i>
        ))}
        {!Number.isInteger(+rating) ? (
          <>
            {ratingDecimal < 0.25 ? (
              <i className="fa-regular fa-star text-base"></i>
            ) : ratingDecimal < 0.75 ? (
              <i className="fa-solid fa-star-half-alt text-base"></i>
            ) : (
              <i className="fa-solid fa-star text-base"></i>
            )}
            {Array.from({ length: 5 - Math.ceil(rating) }).map((_, index) => (
              <i className="fa-regular fa-star text-base" key={index}></i>
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: 5 - Math.floor(rating) }).map((_, index) => (
              <i className="fa-regular fa-star text-base" key={index}></i>
            ))}
          </>
        )}
      </div>
    );
  }

  if (size === "small") {
    return (
      <div className="flex items-center text-yellow-400 mt-0.5 mb-3 gap-x-[1.5px] text-xs">
        {Array.from({ length: Math.floor(rating) }).map((_, index) => (
          <i className="fa-solid fa-star" key={index}></i>
        ))}
        {!Number.isInteger(+rating) ? (
          <>
            {ratingDecimal < 0.25 ? (
              <i className="fa-regular fa-star"></i>
            ) : ratingDecimal < 0.75 ? (
              <i className="fa-solid fa-star-half-alt"></i>
            ) : (
              <i className="fa-solid fa-star"></i>
            )}
            {Array.from({ length: 5 - Math.ceil(rating) }).map((_, index) => (
              <i className="fa-regular fa-star" key={index}></i>
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: 5 - Math.floor(rating) }).map((_, index) => (
              <i className="fa-regular fa-star text-xs" key={index}></i>
            ))}
          </>
        )}
      </div>
    );
  }
}
export default Rating;
