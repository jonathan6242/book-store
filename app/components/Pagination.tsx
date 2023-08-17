import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: {
  currentPage: number;
  setCurrentPage: Function;
  totalPages: number;
}) {
  if(totalPages <= 1) {
    return <></>
  }

  return (
    <div className="flex items-center justify-center border-gray-200 bg-white py-2">
      <div className="flex flex-1 items-center justify-center">
        <div>
          <nav
            className="isolate inline-flex -space-x-px"
            aria-label="Pagination"
          >
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((prev: number) => prev - 1)}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:hover:bg-transparent"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-lime-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                className={`relative inline-flex items-center px-4 py-2 text-base font-medium 
                ${
                  currentPage === index + 1
                    ? "z-10 bg-lime-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                } `}
                onClick={() => setCurrentPage(index + 1)}
                key={index}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev: number) => prev + 1)}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:hover:bg-transparent"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default Pagination;
