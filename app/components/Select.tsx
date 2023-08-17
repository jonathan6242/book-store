"use client";
import { Fragment, SyntheticEvent, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { BookProduct } from "../(utils)/types";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  books: BookProduct[];
  setBooks: Function;
  setCurrentPage: Function
}

export default function Select({ books, setBooks, setCurrentPage }: Props) {
  const [filter, setFilter] = useState("");

  function filterText(value: string): string | undefined {
    switch (value) {
      case "lowToHigh":
        return "Price, low to high";
      case "highToLow":
        return "Price, high to low";
      case "rating":
        return "Rating";
      default:
        return "Sort by";
    }
  }

  function onFilterChange(filter: string) {
    setFilter(filter);
    setCurrentPage(1);
    switch (filter) {
      case "lowToHigh":
        setBooks(
          books
            .slice()
            .sort((a, b) => a.created - b.created)
            .sort(
              (a, b) =>
                a.default_price.unit_amount - b.default_price.unit_amount
            )
        );
        break;
      case "highToLow":
        setBooks(
          books
            .slice()
            .sort((a, b) => a.created - b.created)
            .sort(
              (a, b) =>
                b.default_price.unit_amount - a.default_price.unit_amount
            )
        );
        break;
      case "rating":
        setBooks(
          books
            .slice()
            .sort((a, b) => a.created - b.created)
            .sort(
              (a, b) =>
                (+b.metadata.rating) - (+a.metadata.rating)
            )
        );
        break;
      default:
        break;
    }
  }

  return (
    <Listbox value={filter} onChange={onFilterChange}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full sm:w-56 cursor-default bg-white py-2 pl-3 pr-10 text-left text-gray-900 border focus:outline-none text-sm leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">
                  {filterText(filter)}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto bg-white border focus:outline-none text-sm">
              <Listbox.Option
                className={({ active }) =>
                  classNames(
                    active ? "bg-lime-500 text-white" : "text-gray-900",
                    "relative cursor-default select-none py-2 pl-3 pr-9 leading-6"
                  )
                }
                value="lowToHigh"
              >
                {({ selected, active }) => (
                  <>
                    <div className="flex items-center">
                      <span className="ml-3 block truncate">
                        Price, low to high
                      </span>
                    </div>

                    {selected ? (
                      <span
                        className={classNames(
                          active ? "text-white" : "text-lime-600",
                          "absolute inset-y-0 right-0 flex items-center pr-4"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
              <Listbox.Option
                className={({ active }) =>
                  classNames(
                    active ? "bg-lime-500 text-white" : "text-gray-900",
                    "relative cursor-default select-none py-2 pl-3 pr-9 leading-6"
                  )
                }
                value="highToLow"
              >
                {({ selected, active }) => (
                  <>
                    <div className="flex items-center">
                      <span className="ml-3 block truncate">
                        Price, high to low
                      </span>
                    </div>

                    {selected ? (
                      <span
                        className={classNames(
                          active ? "text-white" : "text-lime-600",
                          "absolute inset-y-0 right-0 flex items-center pr-4"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
              <Listbox.Option
                className={({ active }) =>
                  classNames(
                    active ? "bg-lime-500 text-white" : "text-gray-900",
                    "relative cursor-default select-none py-2 pl-3 pr-9 leading-6"
                  )
                }
                value="rating"
              >
                {({ selected, active }) => (
                  <>
                    <div className="flex items-center">
                      <span className="ml-3 block truncate">Rating</span>
                    </div>

                    {selected ? (
                      <span
                        className={classNames(
                          active ? "text-white" : "text-lime-600",
                          "absolute inset-y-0 right-0 flex items-center pr-4"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            </Listbox.Options>

            {/* <Transition
              
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >

            </Transition> */}
          </div>
        </>
      )}
    </Listbox>
  );
}
