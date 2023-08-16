function Price({
  originalPrice,
  salePrice,
  large,
}: {
  originalPrice: number;
  salePrice: number;
  large?: boolean;
}) {
  return (
    <>
      {originalPrice ? (
        <div className="flex items-center gap-1.5 text-base">
          <span
            className={`line-through text-gray-400 ${large ? "text-xl" : ""}`}
          >
            ${(originalPrice / 100).toFixed(2)}
          </span>
          <span className={`${large ? "text-xl" : "text-base"}`}>
            ${(salePrice / 100).toFixed(2)}
          </span>
        </div>
      ) : (
        <div className={`${large ? "text-xl" : "text-base"}`}>
          ${(salePrice / 100).toFixed(2)}
        </div>
      )}
    </>
  );
}
export default Price;
